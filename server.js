"use strict";

const express = require("express");
const next = require("next");
const getConfig = require("next/config").default;
const cacheableResponse = require("cacheable-response");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const md5 = require("md5");
const sgMail = require("@sendgrid/mail");
const htmlEncode = require("htmlencode").htmlEncode;

const dev = process.env["NODE_ENV"] !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

const { ssrCacheTTL } = getConfig().serverRuntimeConfig;

const errorSSRCacheTTL = Number.parseInt(process.env["ERROR_SSR_CACHE_TTL"]) || 1000;

const ssrCache = cacheableResponse({
    ttl: ssrCacheTTL || 1000 * 60 * 60, // 1hour
    get: async ({ req, res, pagePath, queryParams }) => {
        console.log("Performing SSR to cache", { pagePath, queryParams });
        const data = await app.renderToHTML(req, res, pagePath, queryParams);
        return {
            data,
            ttl: res.statusCode === 500 ? errorSSRCacheTTL : undefined,
        };
    },
    send: ({ data, res }) => {
        return res.send(data);
    },
});

const rewrites = [
    {
        from: "/privacypolicy",
        to: "/privacy-policy.pdf",
    },
    {
        from: "/termsandconditions",
        to: "/termsandconditions.pdf",
    },
];

app.prepare().then(() => {
    const server = express();

    const config = getConfig();
    const { port, tpayMerchantId, tpayVerificationCode, sendgridApiKey, joinClubEmail } = config.serverRuntimeConfig;

    // remove trailing slashes
    server.use((req, res, next) => {
        if (req.path.substr(-1) === "/" && req.path.length > 1) {
            const query = req.url.slice(req.path.length);
            res.redirect(301, req.path.slice(0, -1) + query);
        } else {
            next();
        }
    });

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    rewrites.forEach(({ from, to }) => {
        server.get(from, (req, _res, next) => {
            req.url = to;
            next();
        });
    });

    server.get("/donate/:projectId", (req, res) => {
        const host = req.get("host");

        const projectId = req.params.projectId; // TODO: do something with projectId
        const projectName = req.query.projectName;
        const amount = req.query.amount;

        const description = `[KIDS.org.pl] Donacja na '${projectName}'`;
        const returnUrl = `https://${host}/thank-you`;
        const crc = projectId;

        if (!amount || amount < 0.5) {
            return res.status(422);
        }

        const qs = querystring.stringify({
            id: tpayMerchantId,
            amount,
            description,
            crc,
            md5sum: md5(`${tpayMerchantId}&${amount}&${crc}&${tpayVerificationCode}`),
            return_url: returnUrl,
        });

        return res.redirect(`https://secure.tpay.com?${qs}`);
    });

    server.get(/^\/_next/, (req, res) => {
        return handle(req, res);
    });

    if (!dev) {
        server.get(`/(|about|news|projects|partners)(|/*)`, (req, res) => {
            const pagePath = req.path;
            const queryParams = req.params;
            return ssrCache({ req, res, pagePath, queryParams });
        });
    }

    server.get("*", (req, res) => {
        return handle(req, res);
    });

    server.post("/mail", async (req, res) => {
        if (!req.body || !req.body.firstName || !req.body.lastName || !req.body.email) {
            res.status(400).send("Body is malformed");
            return;
        }

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;

        sgMail.setApiKey(sendgridApiKey);

        const to = joinClubEmail.split(";");

        const requestEmail = {
            to,
            cc: [],
            bcc: [],
            from: "info@kids.org.pl",
            subject: "Zgłoszenie do klubu K.I.D.S.",
            html: `
                <div>Nowe zgłoszenie do klubu:</div>
                <div>Imię i nazwisko: ${htmlEncode(`${firstName} ${lastName}`)}</div>
                <div>Email: ${htmlEncode(email)}</div>
                <div>Nr telefonu: ${htmlEncode(phoneNumber)}</div>
            `,
        };

        const thankYouEmail = {
            to: [email],
            cc: [],
            bcc: [],
            from: "info@kids.org.pl",
            subject: "Potwierdzenie zgłoszenia do klubu K.I.D.S",
            html: `
                <div>
                    Dziękujemy za wypełnienie formularza. Koordynator klubu KIDS skontaktuje się z Tobą,
                    aby wyjaśnić szczegóły dotyczące działalności fundacji KIDS oraz jak możesz nam pomóc.
                </div>
                <br />
                <div>Zespół fundacji K.I.D.S.</div>
                <div>Klub Innowatorów Dziecięcych Szpitali</div>
                <br />
                <div>+48 576 333 578</div>
                <div>info@kids.org.pl</div>
            `,
        };

        await Promise.all([sgMail.send(requestEmail), sgMail.send(thankYouEmail)]);

        res.end();
    });

    server.listen(port, err => {
        if (err) {
            throw err;
        }
        console.log(`> Server ready on http://localhost:${port}`);
    });
});
