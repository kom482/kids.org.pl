import { gql } from "apollo-boost";
import Button from "components/Button";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { PrismicParagraph } from "components/typography";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import client from "services/apollo/client";
import styled from "styled-components";

type ThankYouProps = {
    title?: PrismicRichText | null;
    description?: PrismicRichText | null;
    image?: PrismicImage | null;
};

const ThankYou: NextPage<ThankYouProps> = ({ title, description, image }) => {
    return (
        <Section>
            <Head>
                <title>Fundacja K.I.D.S. - Potwierdzenie dołączenia do klubu</title>
            </Head>

            <Row>
                {image && (
                    <Col xs={12} sm={4}>
                        <ThankYouImage src={image.url} alt={image.alt ?? undefined} />
                    </Col>
                )}
                <Col xs={12} sm={8}>
                    {title && <SectionHeader>{RichText.asText(title)}</SectionHeader>}

                    {description && <PrismicParagraph text={description} />}

                    <div className={"mt-5"}>
                        <Link href="/" passHref>
                            <Button as="a" primary>
                                Wróc na stronę główną
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Section>
    );
};

export default ThankYou;

const ThankYouImage = styled.img`
    max-width: 100%;
`;

export const getStaticProps = async () => {
    try {
        const response = await client.query({
            query: gql`
                query {
                    allJoin_club_confirmations {
                        edges {
                            node {
                                title
                                description
                                image
                            }
                        }
                    }
                }
            `,
        });

        const { title, description, image } = response.data.allJoin_club_confirmations.edges[0].node;

        return {
            props: {
                title,
                description,
                image,
            },
        };
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch thank-you content");
    }
};
