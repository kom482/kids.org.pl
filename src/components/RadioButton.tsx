import React from "react";
import styled, { css } from "styled-components";
import { theme } from "styles/theme";
import { NormalLabel } from "./typography";

type RadioButtonProps = {
    label: React.ReactNode;
    name: string;
    checked: boolean;
    onChange: () => void;
};

const RadioButton: React.FunctionComponent<RadioButtonProps> = ({ label, checked, name, onChange }) => (
    <Wrapper>
        <OptionLabel>{label}</OptionLabel>
        <input type="radio" checked={checked} name={name} onChange={onChange} />
        <Checkmark checked={checked} />
    </Wrapper>
);

export default RadioButton;

const Checkmark = styled.span<{ checked?: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid white;
    opacity: 0.3;

    transition: opacity 0.25s cubic-bezier(1, 0, 0, 1);

    &::after {
        content: "";
        position: absolute;
        display: none;

        border-radius: 50%;
        position: absolute;
        width: 16px;
        height: 16px;
        top: 3px;
        bottom: 3px;
        left: 3px;
        right: 3px;
        background-color: ${theme.palette.grayScale.white};
    }
    
    ${p =>
        p.checked
            ? css`
                opacity: 1;

                &::after {
                    display: block;
                }
              `
            : css``}
`;

const Wrapper = styled.label`
    display: flex;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    > input {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
    }

    &:hover ${Checkmark} {
        opacity: 1;
    }
`;

const OptionLabel = styled(NormalLabel)`
    max-width: 100%;
    color: ${theme.palette.grayScale.white};
`;
