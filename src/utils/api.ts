export const createFormBody = (fields: { key: string, value: string }[]): string => {
    return fields.map(field => `${field.key}=${encodeURIComponent(field.value)}`).join('&');
}