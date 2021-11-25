import LeftTriangles from "images/triangles-left.svg";
import RightTriangles from "images/triangles-right.svg";
import React from "react";
import styled from "styled-components";
import { breakPoints } from "styles/mq";
import { px2rem } from "styles/utils";
import Footer from "./footer";
import Header from "./header";

const Content = styled.div`
    margin: ${px2rem(80)} auto;
    max-width: 1100px;

    @media (max-width: ${breakPoints.sm}) {
        margin: auto;
    }
`;

const SideDecorator = styled.div`
    @media (min-width: ${breakPoints.md}) {
        background: url(${LeftTriangles}) repeat-y left top / 15% auto,
            url(${RightTriangles}) repeat-y right top / 15% auto;
    }
    @media (min-width: ${breakPoints.xxl}) {
        background-size: auto auto, auto auto;
    }
`;

type LayoutProps = {
    items?: CommonContent;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ items, children }) => {
    return (
        <div>
            {items?.header && <Header items={items.header} />}
            <SideDecorator>
                <Content>{children}</Content>
                {items?.footer && <Footer items={items.footer} />}
            </SideDecorator>
        </div>
    );
};

export default Layout;
