import React from "react";
import styled from "styled-components";
import { theme } from "styles/theme";

const Dot: React.FunctionComponent = () => <DotContainer>&nbsp;&nbsp;•&nbsp;&nbsp;</DotContainer>;

export default Dot;

const DotContainer = styled.span`
    color: ${theme.palette.grayScale.gray500};
    font-size: 1.5em;
    line-height: 0;
`;
