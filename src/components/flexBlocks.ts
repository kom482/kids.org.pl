import styled from "styled-components";
import { breakPoints } from "styles/mq";
import { px2rem } from "styles/utils";

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    @media (max-width: ${breakPoints.sm}) {
        margin-top: ${px2rem(16)};
    }
`;
