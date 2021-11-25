import fetch from "isomorphic-unfetch";

export async function retryFetchJsonForFallbackUrls(urls: string[]) {
    let errors: Error[] = [];
    for (const url of urls) {
        try {
            const result = await fetch(url);
            const content = await result.json();
            return content;
        } catch (e) {
            errors.push(e);
        }
    }
    throw new Error(`Failed to fetch all of the following urls:
${urls.map(url => `  - ${url}`).join("\n")}
Inner errors:
${errors.map(error => String(error)).join("\n")}
`);
}
