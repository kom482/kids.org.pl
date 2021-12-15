import { css } from "styled-components";

const fonts = css`
    :root {
        font-family: Inter;
        font-weight: 400;
    }

    @font-face {
        font-family: Inter;
        src: url(/fonts/interRegular.otf);
        font-weight: 400;
    }

    @font-face {
        font-family: Inter;
        src: url(/fonts/interSemiBold.otf);
        font-weight: 600;
    }

    @font-face {
        font-family: Intro;
        src: url(/fonts/introBlack.otf);
        font-weight: 900;
    }
`;

export default fonts;
