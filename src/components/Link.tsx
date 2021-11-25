import React from "react";
import NextLink from "next/link";
import styled from "styled-components";

type LinkProps = {
    to: string;
    as?: string;
    external?: boolean;
}

const Link: React.FunctionComponent<LinkProps> = ({ children, to, as, external }) => external ? (
    <ExternalLink href={to} target={"_blank"}>{children}</ExternalLink>
) : (
    <NextLink href={to} as={as} passHref>{children}</NextLink>
)

const ExternalLink = styled.a`
    &:hover {
        text-decoration: none;
    }
`;

export default Link;