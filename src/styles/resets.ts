import { css } from "styled-components";

export const resetUl = css`
    margin-top: 0;
    margin-bottom: 0;
    padding-inline-start: 0;

    padding-left: 0;

    list-style: none;
`;
export const resetButton = css`
    background: none;
    outline: none;
    border: none;
    box-shadow: none;
`;

export const resetInput = css`
    ${resetButton}
`;

export const resetA = css`
    text-decoration: inherit;
    color: inherit;
`;
