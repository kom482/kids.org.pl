import React from "react";
import styled from "styled-components";
import { breakPoints } from "styles/mq";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";

type MenuIconProps = {
    open: () => void;
};

const MenuIcon = (props: MenuIconProps) => (
    <Root className="align-self-center" onClick={props.open}>
        <div />
        <div />
        <div />
    </Root>
);

export default MenuIcon;

const Root = styled.div`
    display: none;
    cursor: pointer;
    width: 35px;
    margin-right: ${px2rem(24)};
    > div {
        width: 35px;
        height: 5px;
        background-color: ${theme.palette.brand.secondary500};
        margin: 6px 0;
    }
    @media (max-width: ${breakPoints.lg}) {
        display: block;
    }
`;
