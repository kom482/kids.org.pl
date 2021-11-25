import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";
import { theme } from "styles/theme";
import { ChevronRightPrimary } from "./styledIcons";

type EmphasizedLinkProps = {
    href?: string;
    fullWidth?: boolean;

    onClick?: () => void;
    className?: string;
};

const EmphasizedLink: React.FunctionComponent<EmphasizedLinkProps> = ({
    href,
    children,
    fullWidth,
    className,
    onClick,
}) => {
    const content = (
        <EmphasizedLinkContainer
            as={href ? "a" : undefined}
            fullWidth={fullWidth}
            className={className}
            onClick={onClick}
        >
            {children}
            <ChevronRightPrimary />
        </EmphasizedLinkContainer>
    );

    return href ? (
        <Link href={href} passHref>
            {content}
        </Link>
    ) : (
        content
    );
};

const EmphasizedLinkContainer = styled.div<{ fullWidth?: boolean }>`
    color: ${theme.palette.brand.primary500};
    font-weight: bold;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;

    ${({ fullWidth }) =>
        fullWidth
            ? css`
                  width: 100%;
              `
            : css``}

    &:hover {
        text-decoration: none;
        color: ${theme.palette.brand.primary500};
    }
`;

export default EmphasizedLink;
