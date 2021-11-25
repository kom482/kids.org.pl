import { RichText } from "prismic-reactjs";
import React from "react";
import styled, { css } from "styled-components";
import { breakPoints } from "styles/mq";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";

export const LargeBody = styled.p`
    margin: 0 0 ${px2rem(24)} 0;
    font-size: ${px2rem(24)};
    line-height: ${px2rem(34)};
    color: ${theme.palette.grayScale.gray900};
    white-space: pre-line;
    text-align: justify;
`;

export const Paragraph = styled.p<{ noMargin?: boolean }>`
    margin: 0 0 ${({ noMargin }) => (noMargin ? 0 : px2rem(20))} 0;
    font-size: ${px2rem(20)};
    line-height: ${px2rem(28)};
    color: ${theme.palette.grayScale.gray600};
    white-space: pre-line;
`;

const PrismicParagraphContainer = styled.div<{ noMargin?: boolean; compact?: boolean; centeredOnMobile?: boolean }>`
    font-size: ${px2rem(20)};
    line-height: ${px2rem(28)};
    white-space: pre-line;
    img{
        width:100%;
    }
    p,
    ul {
        color: ${theme.palette.grayScale.gray600};
    }
    p {
        margin: 0 0 ${({ noMargin }) => (noMargin ? 0 : px2rem(20))} 0;
    }
    h4 {
        margin-top: ${px2rem(80)};
    }

    @media (max-width: ${breakPoints.sm}) {
        ${p =>
            p.centeredOnMobile &&
            css`
                text-align: center;
            `};
    }
`;

type PrismicParagraphProps = {
    text: PrismicRichText;
    noMargin?: boolean;
    compact?: boolean;
    centeredOnMobile?: boolean;
};

export const PrismicParagraph: React.FunctionComponent<PrismicParagraphProps> = ({
    text,
    noMargin,
    compact,
    centeredOnMobile,
}) => (
    <PrismicParagraphContainer noMargin={noMargin} compact={compact} centeredOnMobile={centeredOnMobile}>
        <RichText render={text} />
    </PrismicParagraphContainer>
);

export const SmallBody = styled.p`
    margin: 0 0 ${px2rem(24)} 0;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(20)};
    color: ${theme.palette.grayScale.gray500};
    white-space: pre-line;
`;

export const LargeLabel = styled.span`
    font-size: ${px2rem(24)};
    font-weight: 600;
    line-height: ${px2rem(28)};
    color: ${theme.palette.grayScale.gray900};
`;

export const NormalLabel = styled.span`
    font-size: ${px2rem(20)};
    font-weight: 600;
    line-height: ${px2rem(26)};
    color: ${theme.palette.grayScale.gray900};
`;

export const SmallLabel = styled.span`
    display: inline-block;
    margin-bottom: ${px2rem(16)};
    font-weight: 600;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(24)};
    color: ${theme.palette.grayScale.gray900};
`;
