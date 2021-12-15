import getConfig from "next/config";
import querystring from "querystring";
import md5 from "md5";

const { serverRuntimeConfig } = getConfig();
const { tpayMerchantId, tpayVerificationCode } = serverRuntimeConfig;

export default function handler(req, res) {
    const host = req.headers["host"];

    const projectId = req.query.projectId; // TODO: do something with projectId
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
}