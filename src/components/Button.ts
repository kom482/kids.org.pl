import styled from "styled-components";
import { resetButton } from "styles/resets";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";

function toType(func: (type: "primary" | "inverted" | "default") => string) {
    return (primaryOrInverted: { primary?: boolean } | { inverted?: boolean }) => {
        if ("primary" in primaryOrInverted && primaryOrInverted.primary) {
            return func("primary");
        }

        if ("inverted" in primaryOrInverted && primaryOrInverted.inverted) {
            return func("inverted");
        }

        return func("default");
    };
}

function typeDict(dict: { primary: string; inverted: string; default: string }) {
    return toType(type => dict[type]);
}

type ButtonProps = ({ primary?: boolean; inverted?: false } | { primary?: false; inverted?: boolean }) & {
    small?: boolean;
};

const Button = styled.button<ButtonProps>`
    ${resetButton}
    font-family: Intro;
    font-style: normal;
    font-weight: 900;
    font-size: ${({ small }) => (small ? "16px" : "20px")};
    line-height: 24px;
    transition: all 0.25s cubic-bezier(1, 0, 0, 1);
    display: inline-block;

    border: 2px solid
        ${typeDict({
            primary: theme.palette.brand.primary500,
            inverted: theme.palette.grayScale.white,
            default: theme.palette.grayScale.gray200,
        })};
    padding: ${({ small }) => (small ? px2rem(6) : px2rem(16))} ${px2rem(16)};
    color: ${typeDict({
        primary: theme.palette.grayScale.white,
        inverted: theme.palette.brand.primary500,
        default: theme.palette.grayScale.gray900,
    })};
    background-color: ${typeDict({
        primary: theme.palette.brand.primary500,
        inverted: theme.palette.grayScale.white,
        default: theme.palette.grayScale.white,
    })};

    &:hover:not(:disabled) {
        border: 2px solid
            ${typeDict({
                primary: theme.palette.brand.primary500,
                inverted: theme.palette.brand.primary500,
                default: theme.palette.grayScale.gray300,
            })};

        color: ${typeDict({
            primary: theme.palette.grayScale.white,
            inverted: theme.palette.grayScale.white,
            default: theme.palette.grayScale.gray900,
        })};

        background-color: ${typeDict({
            primary: theme.palette.buttons.hover,
            inverted: theme.palette.brand.primary500,
            default: theme.palette.grayScale.white,
        })};

        text-decoration: none;
    }

    &:active:enabled {
        background-color: ${theme.palette.grayScale.gray100};
        border: 2px solid ${theme.palette.grayScale.gray300};
    }

    &:disabled {
        background-color: ${theme.palette.grayScale.gray100};
        opacity: 0.3;
    }
`;

export const LinkButton = Button.withComponent("a");

export default Button;
