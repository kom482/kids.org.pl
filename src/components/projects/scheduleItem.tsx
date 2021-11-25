import { RichText } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import { formatToMonthAndYear } from "utils/date";

type ScheduleItemProps = {
    item: MakeOptional<ProjectScheduleItem>;

    isFirst: boolean;
    isLast: boolean;
    nextCompleted: boolean;
};

export const ScheduleItem: React.FunctionComponent<ScheduleItemProps> = ({ item, isFirst, isLast, nextCompleted }) => {
    const isCompleted = item.completion_status === "zrealizowany";

    return (
        <Container>
            <TimeLine>
                <TopLine isVisible={!isFirst} emphasized={isCompleted} />
                <Diamond emphasized={isCompleted} />
                <BottomLine isVisible={!isLast} emphasized={isCompleted && nextCompleted} />
            </TimeLine>
            <ItemDetails>
                <Arrow />
                {item.date && <Date>{formatToMonthAndYear(item.date)}</Date>}
                {item.target && <ItemTarget isCompleted={isCompleted}>{RichText.asText(item.target)}</ItemTarget>}
            </ItemDetails>
        </Container>
    );
};

const Date = styled.div`
    color: ${theme.palette.grayScale.gray500};
`;

const ItemTarget = styled.div<{ isCompleted: boolean }>`
    font-size: ${px2rem(20)};
    font-weight: 600;
    color: ${props => (props.isCompleted ? theme.palette.brand.primary500 : "initial")};
`;

const Container = styled.div`
    display: flex;
`;

const TimeLine = styled.div`
    margin-right: ${px2rem(22)};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ItemDetails = styled.div`
    background-color: ${theme.palette.grayScale.white};
    width: 100%;
    margin-bottom: ${px2rem(32)};
    padding: ${px2rem(16)};
    position: relative;
    box-shadow: ${px2rem(2)} ${px2rem(2)} ${px2rem(1)} ${theme.palette.grayScale.gray400};
`;

const Line = styled.div<{ isVisible: boolean; emphasized: boolean }>`
    width: ${px2rem(4)};
    background-color: ${props => (props.emphasized ? theme.palette.brand.primary500 : theme.palette.grayScale.gray400)};
    visibility: ${props => (props.isVisible ? "initial" : "hidden")};
`;

const Diamond = styled.div<{ emphasized: boolean }>`
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    background-color: ${props => (props.emphasized ? theme.palette.brand.primary500 : theme.palette.grayScale.gray400)};
`;

const TopLine = styled(Line)`
    height: ${px2rem(12)};
`;

const BottomLine = styled(Line)`
    flex: 1 0 auto;
    width: ${px2rem(4)};
`;

const Arrow = styled.div`
    position: absolute;
    height: ${px2rem(24)};
    width: ${px2rem(24)};
    top: 0;
    left: 0;
    transform: translateX(-98%);
    background-color: ${theme.palette.grayScale.white};
    clip-path: polygon(0 0, 100% 0, 100% 100%);
`;
