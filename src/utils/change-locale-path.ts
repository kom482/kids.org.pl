import { nonterminatedLocaleRegex } from "./locale";

const localizedPathRegex = new RegExp("^/" + nonterminatedLocaleRegex.source + "(/|$)", nonterminatedLocaleRegex.flags);

export default function changeLocalePath(path: string, locale: string) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const match = localizedPathRegex.exec(normalizedPath);
    if (match && match[0]) {
        if (match[0].length === normalizedPath.length) {
            return `/${locale}${normalizedPath.endsWith("/") ? "/" : ""}`;
        }
        return `/${locale}/${normalizedPath.substring(match[0].length)}`;
    }
    return `/${locale}${normalizedPath}`;
}
