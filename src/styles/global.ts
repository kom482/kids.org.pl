import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";
import fonts from "./fonts";
import { theme } from "./theme";
import { px2rem } from "./utils";

export const headerHeight = 140; //px

export const GlobalStyles = createGlobalStyle`

    ${styledNormalize};
    ${fonts};
    * {
        box-sizing: border-box;
    }

    html {
        --min-gutter-size: 3rem;
        --rem-base: 16;
    }

    body {
        margin: 0;
        padding: 0;
        background-color: ${theme.palette.grayScale.white};
        overflow-x: hidden;
        white-space: pre-line;
    }

    body[data-mobile-menu-open="true"] {
        overflow-y: hidden;
    }

    main {
        display: block;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: Intro;
    }
    
    h1 {
        font-size: ${px2rem(90)};
        line-height: ${px2rem(90)};
        font-weight: 900;
    }
    h2 {
        font-size: ${px2rem(48)};
        line-height: ${px2rem(48)};
        font-weight: 900;
    }
    h3 {
        font-size: ${px2rem(36)};
        line-height:  ${px2rem(40)};
        font-weight: 900;
    }
    h4 {
        font-size:  ${px2rem(28)};
        line-height: ${px2rem(30)};
        font-weight: 900;
    }
    h5 {
        font-size:   ${px2rem(20)};
        line-height:   ${px2rem(24)};
        font-weight: 900;
    }
    h6 {
        font-size: ${px2rem(16)};
        line-height: ${px2rem(20)};
        font-weight: 900;
    }

    button {
    }

    a {
        outline: none;
    }

    span {
        line-height: 1;
    }

    strong {
    }
`;
