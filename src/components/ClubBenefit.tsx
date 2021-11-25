import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import { Col, Row } from "react-bootstrap";
import CropCorner from "./CropCorner";
import { px2rem } from "styles/utils";
import { breakPoints } from "styles/mq";

const Title = styled.h5`
    color: ${theme.palette.grayScale.gray900};
    margin-bottom: 1rem;
    white-space: pre-wrap;
`;

const Text = styled.p`
    color: ${theme.palette.grayScale.gray600};
`;

const ImageWrapper = styled.div`
    position: relative;
`;

const Image = styled.img`
    width: 100%;
    display: block;
    max-height: ${px2rem(260)};

    @media (max-width: ${breakPoints.lg}) {
        width: auto;
        margin: auto;
        margin-bottom: 1rem;
    }
`;

const ClubBenefitRow = styled(Row)`
    margin-bottom: 2rem;
`;

type ClubBenefitProps = {
    image?: string;
    alt?: string;
    title?: string;
    text?: string;
}

const ClubBenefit: FunctionComponent<ClubBenefitProps> = ({ image, alt, title, text }) => (
    <ClubBenefitRow>
        <Col lg={4}>
            <CropCorner bottomRight size={40}>
                <ImageWrapper>
                    <Image alt={alt} src={image} />
                </ImageWrapper>
            </CropCorner>
        </Col>
        <Col lg={8}>
            <Title>{title}</Title>
            <Text>{text}</Text>
        </Col>
    </ClubBenefitRow>
);

export default ClubBenefit;
