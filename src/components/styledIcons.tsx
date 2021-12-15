import ChevronRight from "images/chevron-right.svg";
import CloseIcon from "images/close.svg";
import styled from "styled-components";
import { theme } from "styles/theme";

export const ChevronRightPrimary = styled(ChevronRight)`
    .st1 {
        stroke: ${theme.palette.brand.primary500};
    }
`;

export const ChevronRightWhite = styled(ChevronRight)`
    .st1 {
        stroke: ${theme.palette.grayScale.white};
    }
`;

export const CloseIconSecondary = styled(CloseIcon)`
    .st1 {
        stroke: ${theme.palette.brand.secondary500};
    }
`;
