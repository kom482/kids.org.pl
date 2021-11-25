declare module "*.svg?sprite" {
    const svg: "svg";
    export default svg;
}

declare module "*.svg?include" {
    const svg: string;
    export default svg;
}

declare module "*.svg?react" {
    const svg: "svg";
    export default svg;
}

declare module "*.svg" {
    const url: string;
    export default url;
}

declare module "*.png" {
    const url: string;
    export default url;
}

declare module "*.jpg" {
    const url: string;
    export default url;
}

declare module "*.jpg?resize" {
    const img: {
        src: string;
        srcSet: string;
    };
    export default img;
}

declare module "*.otf" {
    const url: string;
    export default url;
}

declare module "*.ttf" {
    const url: string;
    export default url;
}
