import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { breakPoints } from "styles/mq";
import { px2rem } from "styles/utils";

type SectionProps = {
    className?: string;
    thin?: boolean;
};

const Section: React.FunctionComponent<SectionProps> = ({ children, className, thin }) => (
    <SectionContainer as={"section"} className={`container${className ? " " + className : ""}`}>
        {thin ? (
            <Row>
                <Col md={{ span: 8, offset: 2 }}>{children}</Col>
            </Row>
        ) : (
            children
        )}
    </SectionContainer>
);

export default Section;

const SectionContainer = styled(Container)`
    margin-bottom: ${px2rem(160)};
    @media (max-width: ${breakPoints.xxl}) {
        margin-bottom: ${px2rem(100)};
    }
    @media (max-width: ${breakPoints.xl}) {
        margin-bottom: ${px2rem(80)};
    }
    @media (max-width: ${breakPoints.md}) {
        margin-bottom: ${px2rem(60)};
    }
    @media (max-width: ${breakPoints.sm}) {
        margin-bottom: ${px2rem(40)};
    }
`;
