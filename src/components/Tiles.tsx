import Link from "next/link";
import React from "react";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";

const Tiles = styled(Row)``;

type TileProps = {
    className?: string;
    href?: string;
    isExternalHref?: boolean;
    noPadding?: boolean;
    onClick?: () => void;
};

export const Tile: React.FunctionComponent<TileProps> = ({ children, className, href, isExternalHref, noPadding, onClick }) => {
    const content = (
        <TileContainer
            className="col-md-3 col-6"
            as={href ? "a" : undefined}
            target={isExternalHref ? "_blank" : undefined}
            rel={isExternalHref ? "noopener noreferer" : undefined}
            onClick={onClick}
        >
            <TileContent className={className} noPadding={noPadding}>{children}</TileContent>
        </TileContainer>
    );

    return href ? (
        <Link href={href} passHref prefetch={false}>
            {content}
        </Link>
    ) : (
        content
    );
};

const TileContainer = styled.div`
    margin-bottom: ${px2rem(30)};

    &:hover {
        text-decoration: none;
    }
`;

const TileContent = styled.div<{ noPadding?: boolean }>`
    display: flex;
    height: 100%;
    width: 100%;
    padding: ${p => p.noPadding ? 0 : px2rem(20)};
    justify-content: center;
    align-items: flex-start;
    min-height: ${px2rem(120)};
    border: solid 1px ${theme.palette.grayScale.gray100};

    cursor: pointer;

    &:hover {
        border-color: ${theme.palette.brand.primary500};

        h5 {
            color: ${theme.palette.brand.primary500};
        }
    }
`;

export default Tiles;
