export default function toSingle<T>(value: T | T[]) {
    return Array.isArray(value) ? value[0] : value;
}
