import { gql } from "apollo-boost";
import Button from "components/Button";
import CompanyTile from "components/CompanyTile";
import CropCorner from "components/CropCorner";
import Section from "components/Section";
import Tiles from "components/Tiles";
import { Paragraph, SmallBody } from "components/typography";
import { NextPage } from "next";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import client from "services/apollo/client";
import styled from "styled-components";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import Share from "components/Share";

const Partners: NextPage<PartnersNode> = ({
    main_image,
    header,
    description,
    support_us_header,
    companies,
    how_can_help_header,
    how_can_help_description,
    how_company_can_help,
    send_submission,
}) => {
    const [showAllCompanies, setShowAllCompanies] = useState(false);
    return (
        <main>
            <Head>
                <title>Fundacja K.I.D.S. - Partnerzy</title>
            </Head>

            <ImageSection>
                <Row>
                    <Col>
                        <CropCorner bottomRight>
                            <Image src={main_image?.url || ""} alt="mainImage" />
                        </CropCorner>
                    </Col>
                </Row>
            </ImageSection>
            <Section thin>
                <Row>
                    <Col>
                        {header && <Header>{RichText.asText(header)}</Header>}
                        {description && <Paragraph className="mb-5">{RichText.asText(description)}</Paragraph>}
                    </Col>
                </Row>
            </Section>
            <Section>
                <Row>
                    <Col>
                        {support_us_header && <Header>{RichText.asText(support_us_header)}</Header>}

                        <Tiles>
                            {companies &&
                                companies
                                    .slice(0, showAllCompanies ? companies.length : 16)
                                    .map((item, i) =>
                                        item.company ? <CompanyTile key={i} company={item.company} /> : null,
                                    )}
                        </Tiles>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <CenterButton md={4} className="justify-self-center">
                        {showAllCompanies ? (
                            <Button onClick={() => setShowAllCompanies(false)}>Ukryj</Button>
                        ) : (
                            <Button onClick={() => setShowAllCompanies(true)}>Pokaż więcej</Button>
                        )}
                    </CenterButton>
                </Row>
            </Section>
            <Section thin>
                <Row>
                    <Col>
                        {how_can_help_header && (
                            <Header>
                                <RichText render={how_can_help_header} />
                            </Header>
                        )}
                        {how_can_help_description && (
                            <Paragraph className="mb-5">{RichText.asText(how_can_help_description)}</Paragraph>
                        )}
                    </Col>
                </Row>
                <Row>
                    {how_company_can_help &&
                        how_company_can_help.map((item, i) => (
                            <Col md={4} key={i}>
                                {item.how_help_header && (
                                    <HowHelpHeader>{RichText.asText(item.how_help_header)}</HowHelpHeader>
                                )}
                                {item.how_help_description && (
                                    <SmallBody>{RichText.asText(item.how_help_description)}</SmallBody>
                                )}
                            </Col>
                        ))}
                </Row>
            </Section>
            {send_submission && (
                <Section>
                    <Row className="justify-content-center">
                        <CenterButton md={4} className="justify-self-center">
                            <Button
                                as="a"
                                href={(send_submission?._linkType === "Link.web" && send_submission?.url) || undefined}
                                primary
                                onClick={() => setShowAllCompanies(false)}
                            >
                                Wyślij zgłoszenie
                            </Button>
                        </CenterButton>
                    </Row>
                </Section>
            )}
            <Section>
                <Share />
            </Section>
        </main>
    );
};

const ImageSection = styled.section`
    margin-bottom: ${px2rem(60)};
`;

const Image = styled.img`
    display: block;
    max-width: 100%;
`;

const Header = styled.h2`
    margin-bottom: ${px2rem(38)};
    strong {
        color: ${theme.palette.brand.primary500};
    }
`;

const HowHelpHeader = styled.h4`
    margin-bottom: ${px2rem(16)};
`;

const CenterButton = styled(Col)`
    display: flex;
    justify-content: center;
`;

Partners.getInitialProps = async () => {
    try {
        const data = await client.query<{
            allPartnerss: PrismicNodes<PartnersNode>;
        }>({
            query: gql`
                {
                    allPartnerss {
                        edges {
                            node {
                                main_image
                                header
                                description
                                support_us_header
                                how_can_help_header
                                how_can_help_description
                                companies {
                                    company {
                                        ... on Company {
                                            logo
                                            name
                                            url {
                                                _linkType
                                                ... on _ExternalLink {
                                                    url
                                                }
                                            }
                                        }
                                    }
                                }
                                how_company_can_help {
                                    how_help_header
                                    how_help_description
                                }
                                send_submission {
                                    _linkType
                                    ... on _ExternalLink {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            `,
        });

        return data.data.allPartnerss.edges[0]?.node;
    } catch (e) {
        console.error(e);
        throw new Error("Can't fetch common content");
    }
};

export default Partners;
