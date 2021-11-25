import { RichText } from "prismic-reactjs";
import React from "react";
import styled, { css } from "styled-components";
import { breakPoints } from "styles/mq";
import { px2rem } from "styles/utils";
import { PrismicParagraph } from "./typography";

type PersonProps = {
    data: PersonNode;
    compact?: boolean;
};

const Person: React.FunctionComponent<PersonProps> = ({ data, compact }) => {
    const TitleComponent = compact ? CenteredHeaderH5 : CenteredHeaderH4;

    return (
        <PersonContainer compact={compact}>
            {data.thumbnail && <Avatar compact={compact} avatar={data.thumbnail.url ?? undefined} />}
            <div>
                <TitleComponent>
                    {data.degree && RichText.asText(data.degree)} {data.first_name && RichText.asText(data.first_name)}{" "}
                    {data.last_name && RichText.asText(data.last_name)}
                </TitleComponent>
                {data.description && (
                    <PrismicParagraph noMargin text={data.description} compact={compact} centeredOnMobile={!compact} />
                )}
            </div>
        </PersonContainer>
    );
};

const PersonContainer = styled.div<{ compact?: boolean }>`
    display: flex;
    flex-direction: ${({ compact }) => (compact ? "row" : "column")};
    @media (max-width: ${breakPoints.sm}) {
        justify-content: center;
        align-items: center;
        ${p =>
            p.compact &&
                css`
                    flex-direction: column;

                    p {
                        text-align: center;
                    }
                `
        }
    }
    margin-bottom: ${px2rem(50)};
`;

const Avatar = styled.div<{ compact?: boolean; avatar?: string }>`
    border-radius: 50%;
    height: ${({ compact }) => px2rem(compact ? 96 : 160)};
    width: ${({ compact }) => px2rem(compact ? 96 : 160)};
    flex: 0 0 auto;
    margin: 0 ${px2rem(20)} ${px2rem(30)} 0;

    background: url(${({ avatar }) => avatar}) no-repeat center center / cover;
`;

const CenteredHeaderH4 = styled.h4`
    @media (max-width: ${breakPoints.sm}) {
        text-align: center;
    }
`;

const CenteredHeaderH5 = styled.h5`
    @media (max-width: ${breakPoints.sm}) {
        text-align: center;
    }
`;

export default Person;
