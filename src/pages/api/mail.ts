import getConfig from "next/config";
import sgMail from "@sendgrid/mail";
import { htmlEncode } from "htmlencode";


const { serverRuntimeConfig } = getConfig();
const { sendgridApiKey, joinClubEmail } = serverRuntimeConfig;


export default async function handler(req, res) {

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
}