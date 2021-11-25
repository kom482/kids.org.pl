import React from "react";
import SimpleTile from "./SimpleTile";

type ArticleTileProps = {
    article: ArticleNode;
};

const ArticleTile: React.FunctionComponent<ArticleTileProps> = ({ article }) => (
    <SimpleTile
        isExternalHref
        href={(article.url?._linkType === "Link.web" && article.url?.url) || undefined}
        image={article.image?.url ?? undefined}
        imageAlt={article.image?.alt ?? undefined}
    />
);

export default ArticleTile;
