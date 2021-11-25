import { decode as base64Decode } from "js-base64";
import Papa from "papaparse";
import getConfig from "next/config";
import { todayFormatted } from "utils/date";

const { tpayApiKey, tpayApiPassword } = getConfig().serverRuntimeConfig;

const idColumnName = "CRC transakcji";
const paidColumnName = "Zapłacono";

const isExternalProject = (projectId: string): boolean => projectId.startsWith("TR") && projectId.length === 7; 

export type TPayProjectDonations = {
    donations: number;
    sum: number;
}

type TPayDonations = {
    [key: string]: TPayProjectDonations
};

const fetchDonations = async (): Promise<TPayDonations> => {
    // https://docs.tpay.com/#!/Transaction_API/post_api_gw_api_key_transaction_report
    const requestBody = {
        from_date: "2019-01-01", // required
        to_date: todayFormatted(),
        api_password: tpayApiPassword,
    };

    const response = await fetch(
        `https://secure.tpay.com/api/gw/${tpayApiKey}/transaction/report`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        },
    );

    if (response.status == 200) {
        const responseBody = await response.json();
        if (responseBody.result === 1) {
            // Decoding report and removing first line (it contains some irrelevant description)
            let report = base64Decode(responseBody.report);
            report = report.substring(report.indexOf("\n") + 1);

            // Parsing to csv
            const parseResult = Papa.parse(report, { delimiter: ";", header: true, skipEmptyLines: true });

            // Filtering out donations from zmieniajmynadobre.pl
            const donations: any[] = parseResult.data.filter(
                (donation: any) => donation[idColumnName] && !isExternalProject(donation[idColumnName]),
            );
            
            // Grouping by project id and calculating donation sum
            const data: TPayDonations = {};
            for (const donation of donations) {
                const projectId = donation[idColumnName];
                let amount = Number(donation[paidColumnName].replace(",", "."));
                if (isNaN(amount)) {
                    console.log(`Invalid donation value for ${projectId}`);
                    continue;
                }

                if (data[projectId]) {
                    data[projectId].donations = data[projectId].donations + 1;
                    data[projectId].sum = data[projectId].sum + amount;
                } else {
                    data[projectId] = {
                        donations: 1,
                        sum: amount
                    }
                }
            }

            return data;
        }
    }

    console.log("Invalid response from Tpay API, returning empty record.");
    return {};
};

export default fetchDonations;