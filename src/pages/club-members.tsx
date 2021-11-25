import React from "react";
import { gql } from "apollo-boost";
import { NextPage } from "next";
import Head from "next/head";
import client from "services/apollo/client";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { Col, Row } from "react-bootstrap";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Tiles from "components/Tiles";
import JoinClubCard from "components/JoinClubCard";
import ClubMemberTile from "components/ClubMemberTile";
import CropCorner from "components/CropCorner";
import { PrismicParagraph } from "components/typography";
import { px2rem } from "styles/utils";

type ClubMembersProps = {
    clubMembersPage?: ClubMembersPage;
    clubMembers?: ClubMemberNode[];
    joinClubCard?: JoinClubCardNode;
};

const ClubMembers: NextPage<ClubMembersProps> = ({
    clubMembersPage,
    clubMembers,
    joinClubCard
}) => {
    return (
        <main>
            <Head>
                <title>Fundacja K.I.D.S. - Klubowicze K.I.D.S.</title>
            </Head>

            {clubMembersPage && (
                <>
                    {clubMembersPage.image && (
                        <ImageSection>
                            <Row>
                                <Col>
                                    <CropCorner bottomRight>
                                        <MainImage src={clubMembersPage.image.url} alt={clubMembersPage.image.alt ?? undefined} />
                                    </CropCorner>
                                </Col>
                            </Row>
                        </ImageSection>
                    )}
                    <Section thin>
                        <SectionHeader>{clubMembersPage.title && RichText.asText(clubMembersPage.title)}</SectionHeader>
                        {clubMembersPage.description && <PrismicParagraph text={clubMembersPage.description} />}                
                    </Section>
                </>
            )}

            {clubMembers && (
                <Section>
                    <SectionHeader>Lista klubowiczów</SectionHeader>

                    <Tiles>
                        {clubMembers.map((member, i) => (
                            <ClubMemberTile key={i} member={member} />
                        ))}
                    </Tiles>
                </Section>
            )}

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
    )
}

const ImageSection = styled.section`
    margin-bottom: ${px2rem(60)};
`;

const MainImage = styled.img`
    margin: 0 auto;
    width: 100%;
    max-height: ${px2rem(500)};
    object-fit: cover;
`;

ClubMembers.getInitialProps = async () => {
    try {
        const response = await client.query<{
            clubMembersPage: PrismicNodes<ClubMembersPage>
            clubMembers: PrismicNodes<ClubMembersNode>;
            joinClubCards: PrismicNodes<JoinClubCardNode>;
        }>({
            query: gql`
                {
                    clubMembersPage: allClub_members_pages(first: 1) {
                        edges {
                            node {
                                image
                                title
                                description
                            }
                        }
                    }

                    clubMembers: allClub_memberss(first: 1) {
                        edges {
                            node {
                                members {
                                    image
                                    name
                                    description
                                }
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
            clubMembersPage: response.data.clubMembersPage?.edges[0]?.node,
            clubMembers: response.data.clubMembers?.edges[0]?.node.members ?? [],
            joinClubCard: response.data.joinClubCards.edges[0]?.node ?? undefined,
        };
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch content");
    }
};

export default ClubMembers;