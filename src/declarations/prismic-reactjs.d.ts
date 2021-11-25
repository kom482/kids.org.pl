declare module "prismic-reactjs" {
    export class RichText extends React.Component<{
        render: PrismicRichText;
        linkResolver?: Function;
        htmlSerializer?: Function;
        serializeHyperLink?: any;
        Component?: React.ComponentType;
    }> {
        static asText(data: PrismicRichText): string;
    }
}
