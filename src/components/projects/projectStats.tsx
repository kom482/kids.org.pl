import CropCorner from "components/CropCorner";
import React from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import { formatMoney } from "utils/money";
import { RichText } from "prismic-reactjs";

type ProjectStatsProps = {
    stats: ProjectStatistic[];
};

export const ProjectStats: React.FunctionComponent<ProjectStatsProps> = ({ stats }) => {
    return (
        <BoxShadow>
            <CropCorner bottomRight>
                <Container>
                    <Header>Statystyki</Header>
                    {stats.map(stat => (
                        <SingleStat>
                            <StatLabel>{stat.stat_title && RichText.asText(stat.stat_title)}</StatLabel>
                            <StatValue>{stat.is_money ? formatMoney(stat.stat_value) : stat.stat_value}</StatValue>
                        </SingleStat>
                    ))}
                </Container>
            </CropCorner>
        </BoxShadow>
    );
};

const BoxShadow = styled.div`
    filter: drop-shadow(${px2rem(2)} ${px2rem(2)} ${px2rem(1)} ${theme.palette.grayScale.gray400});
`;

const Container = styled.div`
    padding: ${px2rem(40)} ${px2rem(56)};
    background-color: ${theme.palette.grayScale.white};
`;

const Header = styled.div`
    font-size: ${px2rem(28)};
    margin-bottom: ${px2rem(40)};
    font-weight: 900;
`;

const SingleStat = styled.div`
    margin-bottom: ${px2rem(24)};
`;

const StatLabel = styled.div`
    color: ${theme.palette.grayScale.gray500};
    font-size: ${px2rem(16)};
    font-weight: 600;
`;

const StatValue = styled.div`
    font-size: ${px2rem(28)};
    font-weight: 900;
`;
