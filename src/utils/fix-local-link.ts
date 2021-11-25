import isLocalLink from "./is-local-link";

export default function fixLocalLink(link: string): string {
    return isLocalLink(link) ? link : link;
}
