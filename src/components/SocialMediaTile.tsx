import React from "react";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";

type SocialMediaTileProps = {
    icon: string;
    link: string;
};

const SocialMediaTile: React.FunctionComponent<SocialMediaTileProps> = ({ icon, link }) => {
    return (
        <Col>
            <IconLink href={link} target="_blank">
                <img src={icon} alt="youtube"></img>
            </IconLink>
        </Col>
    );
};

const IconLink = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${px2rem(48)};
    height: ${px2rem(48)};
    margin: 0 ${px2rem(16)} ${px2rem(16)} 0;
    background-color: ${theme.palette.grayScale.gray100};
    cursor: pointer;
`;

export default SocialMediaTile;
