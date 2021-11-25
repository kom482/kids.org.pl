import { gql } from "apollo-boost";
import { NextPage } from "next";
import client from "services/apollo/client";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import { RichText } from "prismic-reactjs";
import { theme } from "styles/theme";
import Section from "components/Section";
import ClubBenefit from "components/ClubBenefit";
import JoinClubForm from "components/JoinClub";
import Head from "next/head";

type JoinClubProps = { joinClub: JoinClubNode }

const JoinClub: NextPage<JoinClubProps> = ({ joinClub }) => {
    const { image, title, text, benefits_title, benefits, join_title, join_consent, join_button } = joinClub;
    return (
        <Section>
            <Head>
                <title>Fundacja K.I.D.S. - Dołącz do klubu</title>
            </Head>

            <Row>
                <Col lg={6}>
                    <Image
                        src={image?.url}
                        alt={image?.alt || undefined}
                    />
                </Col>
                <Col lg={6}>
                    <Title>{title && RichText.asText(title)}</Title>
                    <Text>{text && RichText.asText(text)}</Text>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Title>{benefits_title && RichText.asText(benefits_title)}</Title>
                    {benefits?.map(({ benefit_image, benefit_title, benefit_text }, id) => (
                        <ClubBenefit
                            key={id}
                            image={benefit_image?.url}
                            alt={benefit_image?.alt || undefined}
                            title={benefit_title && RichText.asText(benefit_title) || undefined}
                            text={benefit_text && RichText.asText(benefit_text) || undefined}
                        />
                    ))}
                </Col>
                <Col lg={6}>
                    <JoinClubForm
                        title={join_title && RichText.asText(join_title) || undefined}
                        consentText={join_consent && RichText.asText(join_consent) || undefined}
                        buttonText={join_button && RichText.asText(join_button) || undefined}
                    />
                </Col>
            </Row>
        </Section>
    );
};

const Image = styled.img`
    height: 100%;
    max-width: 100%;
    object-fit: cover;
`;

const Title = styled.h3`
    margin: 2rem 0 4rem;
`;

const Text = styled.p`
    font-size: 1.5rem;
    color: ${theme.palette.grayScale.gray600};
`;

JoinClub.getInitialProps = async () => {
    try {
        const data = await client.query<{
            allJoin_clubs: PrismicNodes<JoinClubNode>;
        }>({
            query: gql`
                {
                    allJoin_clubs {
                        edges {
                            node {
                                image
                                title
                                text
                                benefits_title
                                benefits {
                                    benefit_image
                                    benefit_title
                                    benefit_text
                                }
                                join_title
                                join_consent
                                join_button
                            }
                        }
                    }
                }
                `,
        });

        return {
            joinClub: data.data.allJoin_clubs.edges[0]?.node
        };
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch content");
    }
};

export default JoinClub;