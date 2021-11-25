export default function isLocalLink(link: string) {
    return /(^[/]$)|(^[/][^/])/.test(link);
}
