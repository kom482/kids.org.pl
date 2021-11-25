// Based on https://codesandbox.io/s/building-a-checkbox-component-with-react-and-styled-components-ktyk6
import React from "react";
import styled from "styled-components";
import { theme } from "styles/theme";

type CheckboxProps = {
    checked: boolean;
    onChange: (value: boolean) => void;
};

const Checkbox: React.FunctionComponent<CheckboxProps> = ({ checked, onChange }) => (
    <CheckboxContainer>
        <HiddenCheckbox checked={checked} onChange={e => onChange(e.target.checked)} />
        <StyledCheckbox checked={checked}>
            <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
    </CheckboxContainer>
);

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
`;

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 3px;
    padding-bottom: 10px;
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledCheckbox = styled.div<{ checked?: boolean }>`
    display: inline-block;
    width: 20px;
    height: 20px;
    background: ${p => (p.checked ? theme.palette.brand.primary500 : "white")};
    border: 1px solid ${p => (p.checked ? theme.palette.brand.primary500 : theme.palette.grayScale.gray300)};
    transition: all 150ms;

    ${Icon} {
        visibility: ${p => (p.checked ? "visible" : "hidden")};
    }
`;

export default Checkbox;
