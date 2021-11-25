import { LinkButton } from "components/Button";
import CropCorner from "components/CropCorner";
import { FlexContainer } from "components/flexBlocks";
import SectionSubHeader from "components/SectionSubHeader";
import { NormalLabel, PrismicParagraph } from "components/typography";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import { formatDateToddMMMMyyyy } from "utils/date";

const Time = styled(NormalLabel)`
    margin: ${px2rem(10)} 0;
    color: ${theme.palette.brand.primary500};
`;

const Description = styled.div`
    margin-top: 1rem;
`;

const BuyTicketButton = styled(LinkButton)`
    margin-right: ${px2rem(16)};
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ImageContainer = styled(CropCorner)`
    height: 100%;
`;

const LargeNewsContainer = styled(Row)`
    margin-bottom: ${px2rem(80)};
`;

type LargeNewsProps = {
    news: NewsNode;
};

const LargeNews: React.FunctionComponent<LargeNewsProps> = ({ news }) => (
    <LargeNewsContainer>
        <Col md={6}>
            <ImageContainer topLeft>
                <Image src={news.thumbnail?.url} alt={news.thumbnail?.alt ?? undefined} />
            </ImageContainer>
        </Col>
        <Col md={6}>
            <FlexContainer>
                <div>
                    <SectionSubHeader title={news.type ?? undefined}>
                        {news.title ? RichText.asText(news.title) : null}
                    </SectionSubHeader>

                    {news.date && <Time>{formatDateToddMMMMyyyy(news.date)}</Time>}

                    {news.short_description && (
                        <Description>
                            <PrismicParagraph text={news.short_description} />
                        </Description>
                    )}
                </div>

                <div>
                    {news.cta_label && news.cta_link && (
                        <Link href={news.cta_link.url} passHref>
                            <BuyTicketButton primary>{RichText.asText(news.cta_label)}</BuyTicketButton>
                        </Link>
                    )}

                    {news._meta?.uid && (
                        <Link href={`/news/[newsId]`} as={`/news/${news._meta.uid}`} passHref>
                            <LinkButton>Zobacz więcej</LinkButton>
                        </Link>
                    )}
                </div>
            </FlexContainer>
        </Col>
    </LargeNewsContainer>
);

export default LargeNews;
