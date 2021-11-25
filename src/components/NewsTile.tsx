import { RichText } from "prismic-reactjs";
import React from "react";
import ImageTile from "./ImageTile";

type NewsTileProps = {
    news: NewsNode;
};

const NewsTile: React.FunctionComponent<NewsTileProps> = ({ news }) => (
    <ImageTile
        className={"mt-4"}
        asHref={news._meta?.uid ? `/news/${news._meta.uid}` : undefined}
        href={news._meta?.uid ? `/news/[newsId]` : undefined}
        title={news.title ? RichText.asText(news.title) : undefined}
        image={news.thumbnail?.url || ""}
        label={news.type}
    />
);

export default NewsTile;
