import React from "react";
import client from "services/apollo/client";
import { gql } from "apollo-boost";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { PrismicParagraph } from "components/typography";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import SectionSubHeader from "components/SectionSubHeader";
import { theme } from "styles/theme";
import CropCorner from "components/CropCorner";
import { RichText } from "prismic-reactjs";
import { NextPage } from "next";
import Head from "next/head";

type HowDoWeHelpProps = HowDoWeHelpFoundationPart;

const HowDoWeHelp: NextPage<HowDoWeHelpProps> = ({
                                                     how_do_we_help_title: title,
                                                     how_do_we_help_description: description,
                                                     how_we_help: howWeHelp,
                                                 }) => {
    return (
        <main>
            <Head>
                <title>Fundacja K.I.D.S. - Jak pomagamy</title>
            </Head>

            <Section>
                {title && <SectionHeader>{RichText.asText(title)}</SectionHeader>}

                {description && (
                    <Row>
                        <Col md={6}>
                            <PrismicParagraph text={description} />
                        </Col>
                    </Row>
                )}
            </Section>

            {howWeHelp?.map((section, i) => (
                <Section key={i}>
                    <Row>
                        <Col md={{ span: 6, order: i % 2 === 1 ? 2 : undefined }}>
                            {section.title && <SectionSubHeader>{RichText.asText(section.title)}</SectionSubHeader>}

                            {section.subtitle && (
                                <SectionSubtitle color={section.subtitle_color || theme.palette.brand.primary500}>
                                    {RichText.asText(section.subtitle)}
                                </SectionSubtitle>
                            )}

                            {section.description && <PrismicParagraph text={section.description} />}
                        </Col>
                        {section.image && (
                            <Col md={{ span: 6 }}>
                                <CropCorner bottomRight>
                                    <SectionImage src={section.image.url} alt={section.image.alt ?? undefined} />
                                </CropCorner>
                            </Col>
                        )}
                    </Row>
                </Section>
            ))}
        </main>
    );
};

const SectionImage = styled.img`
    width: 100%;
`;

const SectionSubtitle = styled.h4<{ color: string }>`
    color: ${({ color }) => color};
`;

export const getStaticProps = async () => {
    try {
        const response = await client.query<{
            allFoundations: PrismicNodes<FoundationNode>;
        }>({
            query: gql`
                query {
                    allFoundations {
                        edges {
                            node {
                                how_do_we_help_title
                                how_do_we_help_description
                                how_we_help {
                                    image
                                    title
                                    subtitle
                                    subtitle_color
                                    description
                                }
                            }
                        }
                    }
                }
            `,
        });

        return {
            props: response.data.allFoundations.edges[0].node,
        };
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch how do we help content");
    }
};

export default HowDoWeHelp;
