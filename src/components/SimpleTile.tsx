import { Tile } from "components/Tiles";
import React from "react";
import styled from "styled-components";
import { px2rem } from "styles/utils";

type SimpleTileProps = {
    href?: string;
    isExternalHref?: boolean;
    image?: string;
    imageAlt?: string;
};
``;
const SimpleTile: React.FunctionComponent<SimpleTileProps> = ({ href, image, imageAlt, isExternalHref }) => (
    <Tile href={href} isExternalHref={isExternalHref}>
        {image && <Image src={image} alt={imageAlt} />}
    </Tile>
);

const Image = styled.img`
    max-width: 100%;
    max-height: ${px2rem(120)};
`;

export default SimpleTile;
