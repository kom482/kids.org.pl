import { gql } from "apollo-boost";
import { LinkButton } from "components/Button";
import CropCorner from "components/CropCorner";
import EmphasizedLink from "components/EmphasizedLink";
import ImageTile from "components/ImageTile";
import Person from "components/Person";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { LargeLabel, Paragraph, PrismicParagraph } from "components/typography";
import YoutubeVideo from "components/YoutubeVideo";
import { NextPage } from "next";
import { RichText } from "prismic-reactjs";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import client from "services/apollo/client";
import styled from "styled-components";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import JoinClubCard from "components/JoinClubCard";
import Head from "next/head";

type AboutProps = {
    foundation: FoundationNode;
    joinClubCard?: JoinClubCardNode;

};

const Slogan = styled.h3`
    strong {
        color: ${theme.palette.brand.secondary500};
    }
`;

const Name = styled.h5`
    font-family: Inter;
    font-weight: 600;
    color: ${theme.palette.grayScale.gray500};
`;

const MissionSection = styled(Section)`
    background: ${theme.palette.brand.secondary500};
    color: white;
    text-align: center;
    padding: ${px2rem(60)} 10%;
`;

const MissionLabel = styled(LargeLabel)`
    display: block;
    color: ${theme.palette.extra.orange500};
    text-transform: uppercase;
    margin-bottom: ${px2rem(20)};
`;

const OfficeImage = styled.img`
    max-width: 100%;
`;

const CenteredCol = styled(Col)`
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
`;

const About: NextPage<AboutProps> = ({
                                         foundation: {
                                             managers,
                                             management_title,
                                             council_title,
                                             counselors,
                                             name,
                                             slogan,
                                             youtube,
                                             label_mission,
                                             mission,
                                             how_do_we_help_title,
                                             how_do_we_help_description,
                                             how_we_help,
                                             office_title,
                                             office_image,
                                             office_description,
                                             office_button_label,
                                             office_button_url,
                                         }, joinClubCard,
                                     }) => {
    return (
        <main>
            <Head>
                <title>Fundacja K.I.D.S. - O fundacji</title>
            </Head>

            <Section>
                <Row>
                    <Col md={7}>
                        {name && <Name>{RichText.asText(name)}</Name>}
                        {slogan && (
                            <Slogan>
                                <RichText render={slogan} />
                            </Slogan>
                        )}
                    </Col>
                    {youtube?.thumbnail_url && youtube?.embed_url && (
                        <Col md={5}>
                            <YoutubeVideo thumbnail={youtube.thumbnail_url} iframe={youtube.html} />
                        </Col>
                    )}
                </Row>
            </Section>

            <MissionSection>
                {label_mission && <MissionLabel>{RichText.asText(label_mission)}</MissionLabel>}
                {mission && <h3>{RichText.asText(mission)}</h3>}
            </MissionSection>

            <Section thin>
                {how_do_we_help_title && <SectionHeader>{RichText.asText(how_do_we_help_title)}</SectionHeader>}
                {how_do_we_help_description && <PrismicParagraph text={how_do_we_help_description} />}
                {how_we_help && how_we_help.length > 0 && (
                    <Row>
                        {how_we_help.map((h, i) =>
                            h.image && h.title ? (
                                <ImageTile key={i} image={h.image.url} title={RichText.asText(h.title)}>
                                    {h.subtitle && <Paragraph>{RichText.asText(h.subtitle)}</Paragraph>}
                                    <EmphasizedLink href="/about/how-do-we-help">Dołącz do nas</EmphasizedLink>
                                </ImageTile>
                            ) : null,
                        )}
                    </Row>
                )}
            </Section>

            <Section>
                {management_title && <SectionHeader>{RichText.asText(management_title)}</SectionHeader>}
                <Row>
                    {managers?.map((m, i) =>
                        m.manager ? (
                            <Col md={4} key={i}>
                                <Person data={m.manager} />
                            </Col>
                        ) : null,
                    )}
                </Row>
            </Section>

            <Section>
                {council_title && <SectionHeader>{RichText.asText(council_title)}</SectionHeader>}
                <Row>
                    {counselors?.map((c, i) =>
                        c.counselor ? (
                            <Col md={6} key={i}>
                                <Person data={c.counselor} compact />
                            </Col>
                        ) : null,
                    )}
                </Row>
            </Section>

            <Section>
                <Row>
                    <CenteredCol md={5}>
                        <div>
                            {office_title && <SectionHeader>{RichText.asText(office_title)}</SectionHeader>}
                            {office_description && (
                                <Paragraph className="mb-5">{RichText.asText(office_description)}</Paragraph>
                            )}
                            {office_button_label && office_button_url && (
                                <LinkButton href={office_button_url.url} target="_blank" rel="noreferer noopener">
                                    {RichText.asText(office_button_label)}
                                </LinkButton>
                            )}
                        </div>
                    </CenteredCol>

                    {office_image && (
                        <Col md={7}>
                            <CropCorner bottomRight>
                                <OfficeImage src={office_image.url} alt={office_image.alt ?? undefined} />
                            </CropCorner>
                        </Col>
                    )}
                </Row>
            </Section>

            {joinClubCard && (
                <Section>
                    <JoinClubCard
                        title={joinClubCard.title && <RichText render={joinClubCard.title} />}
                        image={joinClubCard.image && joinClubCard.image.url || undefined}
                        alt={joinClubCard.image && joinClubCard.image.alt || undefined}
                        listItems={joinClubCard.list?.map(item => item.text ? RichText.asText(item.text) : "") ?? []}
                        buttonText={joinClubCard.button_text && RichText.asText(joinClubCard.button_text) || undefined}
                    />
                </Section>
            )}
        </main>
    );
};

export const getStaticProps = async () => {
    try {
        const response = await client.query<{
            allFoundations: PrismicNodes<FoundationNode>;
            joinClubCards: PrismicNodes<JoinClubCardNode>;
        }>({
            query: gql`
                query {
                    allFoundations {
                        edges {
                            node {
                                name
                                slogan
                                youtube
                                label_mission
                                mission
                                how_do_we_help_title
                                how_do_we_help_description
                                how_we_help {
                                    image
                                    title
                                    subtitle
                                }
                                management_title
                                managers {
                                    manager {
                                        ... on People {
                                            degree
                                            first_name
                                            last_name
                                            description
                                            thumbnail
                                        }
                                    }
                                }
                                council_title
                                counselors {
                                    counselor {
                                        ... on People {
                                            degree
                                            first_name
                                            last_name
                                            description
                                            thumbnail
                                        }
                                    }
                                }
                                office_title
                                office_image
                                office_description
                                office_button_url {
                                    ... on _ExternalLink {
                                        url
                                    }
                                }
                                office_button_label
                            }
                        }
                    }

                    joinClubCards: allJoin_club_cards {
                        edges {
                            node {
                                title
                                image
                                list {
                                    text
                                }
                                button_text
                            }
                        }
                    }
                }
            `,
        });

        return {
            props: {
                foundation: response.data.allFoundations.edges[0].node,
                joinClubCard: response.data.joinClubCards.edges[0]?.node ?? undefined,
            },
        };
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch foundation content");
    }
};

export default About;
