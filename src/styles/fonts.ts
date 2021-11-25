import { css } from "styled-components";
import interRegular from "./fonts/interRegular.otf";
import interSemiBold from "./fonts/interSemiBold.otf";
import introBlack from "./fonts/introBlack.otf";

const fonts = css`
    :root {
        font-family: Inter;
        font-weight: 400;
    }

    @font-face {
        font-family: Inter;
        src: url(${interRegular});
        font-weight: 400;
    }

    @font-face {
        font-family: Inter;
        src: url(${interSemiBold});
        font-weight: 600;
    }

    @font-face {
        font-family: Intro;
        src: url(${introBlack});
        font-weight: 900;
    }
`;

export default fonts;
