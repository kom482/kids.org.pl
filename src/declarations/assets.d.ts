declare module "*.svg?url" {
    const url: string;
    export default url;
}

declare module "*.svg" {
    const svg: "svg";
    export default svg;
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
