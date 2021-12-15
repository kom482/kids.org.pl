import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import { Col, Row } from "react-bootstrap";
import { LinkButton } from "components/Button";
import tick from "images/tick.svg?url";
import arrowRight from "images/arrow-right-bold.svg?url";


const Card = styled.div`
    background: white;
    box-shadow: 20px 40px 140px rgba(79, 24, 76, 0.08);
    padding: 2rem 3rem;
`;

const TitleColorFormatting = styled.div`
    font-weight: 900;
    
    strong {
        color: ${theme.palette.extra.orange500};
        font-weight: inherit;
    }

    * {
        font-size: 2.5rem;
    }
`;

const List = styled.ul`
    margin: 2rem 0 3rem;
    padding: 0;
`;

const ListItem = styled.li`
    list-style: none;
    margin: 0.5rem 0;
    padding-left: 1rem;
    color: ${theme.palette.grayScale.gray900};
    font-size: 1.25rem;

    &:before {
        content: url(${tick});
        margin-left: -1rem;
        margin-right: 0.5rem;
        width: 1rem;
    }
`;

const ArrowRight = styled.img`
    margin-left: 1rem;
    margin-top: -0.3rem;
`;

const Image = styled.img`
    max-width: 100%;
`;

type JoinClubCardProps = {
    title?: ReactNode;
    image?: string;
    alt?: string;
    listItems: string[];
    buttonText?: string;
};

const JoinClubCard: FunctionComponent<JoinClubCardProps> = ({ title, image, alt, listItems, buttonText }) => (
    <Card>
        <Row>
            <Col lg={6}>
                <TitleColorFormatting>
                    {title}
                </TitleColorFormatting>
                <List>
                    {listItems.map((item, id) => (
                        <ListItem key={id}>{item}</ListItem>
                    ))}
                </List>
                    <LinkButton primary href={"/join"}>{buttonText}<ArrowRight src={arrowRight} /></LinkButton>
            </Col>
            <Col lg={6}>
                <Image alt={alt} src={image} />
            </Col>
        </Row>
    </Card>
)

export default JoinClubCard;