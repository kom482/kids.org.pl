export function extractBase(locale: string) {
    return split(locale)[0];
}

export function split(locale: string) {
    return locale.split("-");
}

export function isDetailed(locale: string) {
    return locale.includes("-");
}

export const nonterminatedLocaleRegex = /[a-z]{2}(-[a-z]+)*/i;
export const localeRegex = new RegExp("^" + nonterminatedLocaleRegex.source + "$", nonterminatedLocaleRegex.flags);

/**
 * This regex allows only 1-2 2-letter parts
 */
export const localeRegexSimple = /[a-z]{2}(-[a-z]{2})?/i;
