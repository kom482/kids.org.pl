import { gql } from "apollo-boost";
import ArticleTile from "components/ArticleTile";
import Button from "components/Button";
import LargeNews from "components/LargeNews";
import NewsTile from "components/NewsTile";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Tiles from "components/Tiles";
import { NextPage } from "next";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import client from "services/apollo/client";
import styled from "styled-components";
import { breakPoints } from "styles/mq";
import { px2rem } from "styles/utils";

type NewsProps = {
    articles: ArticleNode[];
    mainNews?: NewsNode;
    newses: NewsNode[];
};

type NewsFilter = "all" | "articles" | "news";

const News: NextPage<NewsProps> = ({ articles, mainNews, newses }) => {
    const [newsFilter, setNewsFilter] = useState<NewsFilter>("all");

    const filterNews = useMemo<(news: NewsNode) => boolean>(() => {
        switch (newsFilter) {
            case "all":
                return () => true;
            case "articles":
                return news => news.type === "Artykuł";
            case "news":
                return news => news.type === "Wydarzenie";
        }
    }, [newsFilter]);

    const createFilter = (type: NewsFilter) => {
        return {
            primary: newsFilter === type,
            inverted: newsFilter !== type,
            onClick: () => setNewsFilter(type),
        } as any;
    };

    return (
        <div>
            <Head>
                <title>Fundacja K.I.D.S. - Aktualności</title>
            </Head>

            <Section>
                <SectionHeader>Aktualności</SectionHeader>

                <FilterButtons>
                    <Button small {...createFilter("all")}>
                        Wszystkie aktualności
                    </Button>
                    <Button small {...createFilter("news")}>
                        Wydarzenia
                    </Button>
                    <Button small {...createFilter("articles")}>
                        Artykuły
                    </Button>
                </FilterButtons>

                {mainNews && <LargeNews news={mainNews} />}
            </Section>

            <Section>
                <Row>
                    {newses.filter(filterNews).slice(0, 3).map((news, i) => (
                        <NewsTile news={news} key={i} />
                    ))}
                </Row>
            </Section>

            <Section>
                <SectionHeader>Piszą o nas</SectionHeader>

                <Tiles>
                    {articles.map((article, i) => (
                        <ArticleTile article={article} key={i} />
                    ))}
                </Tiles>
            </Section>

            <Section>
                <Row>
                    {newses.filter(filterNews).slice(3).map((news, i) => (
                        <NewsTile news={news} key={i} />
                    ))}
                </Row>
            </Section>
        </div>
    );
};

const FilterButtons = styled.div`
    display: flex;
    margin-bottom: ${px2rem(72)};
    flex-wrap: wrap;

    @media (max-width: ${breakPoints.sm}) {
        margin-bottom: ${px2rem(16)};
    }

    > * {
        margin-bottom: ${px2rem(8)};
        margin-right: ${px2rem(8)};

        &:last {
            margin-right: 0;
        }
    }
`;

export const getStaticProps = async () => {
    try {
        const data = await client.query<{
            allFoundations: PrismicNodes<FoundationNode>;
            news: PrismicNodes<NewsNode>;
        }>({
            query: gql`
                fragment news on News {
                    _meta {
                        uid
                    }
                    title
                    type
                    date
                    thumbnail
                    short_description
                }

                {
                    allFoundations {
                        edges {
                            node {
                                articles {
                                    image
                                    url {
                                        _linkType
                                        ... on _ExternalLink {
                                            url
                                        }
                                    }
                                }
                                main_news {
                                    ...news
                                }
                            }
                        }
                    }

                    news: allNewss(sortBy: meta_firstPublicationDate_DESC) {
                        edges {
                            node {
                                ...news
                            }
                        }
                    }
                }
            `,
        });

        const foundationNode = data.data.allFoundations.edges[0]?.node;

        return {
            props: {
                mainNews: foundationNode?.main_news ?? undefined,
                newses: data.data.news.edges.map(n => n.node).filter((n): n is NewsNode => !!n) ?? [],
                articles: foundationNode?.articles.filter((a): a is ArticleNode => !!a) ?? [],
            },
        };
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch newses content");
    }
};
export default News;
