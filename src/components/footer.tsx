import facebook from "images/facebook.svg";
import home from "images/home_1.svg";
import instagram from "images/instagram.svg";
import linkedin from "images/linkedin.svg";
import mail from "images/mail.svg";
import phone from "images/phone.svg";
import twitter from "images/twitter.svg";
import youtube from "images/youtube.svg";
import Link from "next/link";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { routes } from "services/routes";
import styled from "styled-components";
import { breakPoints } from "styles/mq";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import ContactTile from "./ContactTile";
import SocialMediaTile from "./SocialMediaTile";
import { SmallBody, SmallLabel } from "./typography";

type FooterProps = {
    items: CommonContent["footer"];
};

const Footer: React.FunctionComponent<FooterProps> = ({ items }) => {
    return (
        <FooterContainer>
            <FooterSection>
                <Col md={3}>
                    <div>
                        <Logo src={items.logo} alt="logo" />
                    </div>
                    <div>
                        <FoundationName src={items.foundation_name} alt="foundation_name" />
                    </div>
                </Col>
                <Col md={4}>
                    <SmallLabel>{items.about_foundation}</SmallLabel>
                    <SmallBody>{items.about_foundation_1}</SmallBody>
                    <SmallBody>{items.about_foundation_2}</SmallBody>
                    <SmallBody>{items.about_foundation_3}</SmallBody>
                    <Link href={routes.footer.privacyPolicy.to}>
                        <PrivacyPolicy>{routes.footer.privacyPolicy.name}</PrivacyPolicy>
                    </Link>
                </Col>
                <Col md={5}>
                    <SmallLabel>{items.contact}</SmallLabel>
                    <Row>
                        <Col sm={12} xl={6}>
                            <ContactTile icon={mail} text={items.email} href={`mailto:${items.email}`}></ContactTile>
                        </Col>
                        <Col sm={12} xl={6}>
                            <ContactTile icon={phone} text={items.phone_number}></ContactTile>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <ContactTile icon={home} text={items.address}></ContactTile>
                        </Col>
                    </Row>

                    <Row>
                        {items.facebook_link && <SocialMediaTile icon={facebook} link={items.facebook_link} />}

                        {items.instagram_link && <SocialMediaTile icon={instagram} link={items.instagram_link} />}

                        {items.youtube_link && <SocialMediaTile icon={youtube} link={items.youtube_link} />}

                        {items.linkedin_link && <SocialMediaTile icon={linkedin} link={items.linkedin_link} />}

                        {items.twitter_link && <SocialMediaTile icon={twitter} link={items.twitter_link} />}
                    </Row>
                </Col>
            </FooterSection>
            <FooterSection className={"align-items-center"}>
                <Col md={4} className={"align-self-center"}>
                    <CreatedByText>{items.labels.created_by}</CreatedByText>
                </Col>
                {items.site_created_by.map((c, i) => (
                    <Col md={2} key={i}>
                        <a href={c.company.url?.url} target="_blank" rel="noopener noreferer">
                            <CreatedByLogo src={c.company.logo?.url} />
                        </a>
                    </Col>
                ))}
            </FooterSection>
        </FooterContainer>
    );
};

const FooterContainer = styled(Container)``;

const FooterSection = styled(Row)`
    padding-top: ${px2rem(80)};
    padding-bottom: ${px2rem(80)};

    border-top: solid ${theme.palette.grayScale.gray200} 2px;

    @media (max-width: ${breakPoints.sm}) {
        padding-top: ${px2rem(40)};
        padding-bottom: ${px2rem(40)};
    }
`;

const Logo = styled.img`
    max-width: 100%;
`;

const CreatedByLogo = styled.img`
    display: block;
    margin: 0;
    max-height: ${px2rem(55)};
`;

const FoundationName = styled.img`
    max-width: 100%;
    margin-top: ${px2rem(20)};
`;

const CreatedByText = styled(SmallLabel)`
    display: block;
    margin: 0;
    color: ${theme.palette.grayScale.gray500};
`;

const PrivacyPolicy = styled(SmallBody)`
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export default Footer;
