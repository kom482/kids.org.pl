import React from "react";
import styled, { css } from "styled-components";
import { theme } from "styles/theme";
import { num2proc, px2rem } from "styles/utils";
import Dot from "./Dot";
import { NormalLabel } from "./typography";

type ProgressBarProps = {
    progress: number;
    info: React.ReactNode;
    secondaryInfo?: React.ReactNode;
    dark?: boolean;
    small?: boolean;

    raisedMoney?: number;
    raisedMoneyLabel?: string;
    donorsOrCompany?: number;
    donorsOrCompanyLabel?: string;
};

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({ progress, info, secondaryInfo, dark, small }) => {
    const color = dark ? theme.palette.brand.secondary500 : theme.palette.brand.primary500;
    const size = small ? px2rem(6) : px2rem(12);

    return (
        <Root>
            <ProgressBarWrapper size={size}>
                <Progress color={color} progress={progress} />
            </ProgressBarWrapper>
            <ProgressBarLabel small={small}>
                <ProgressBarInfo color={color}>{info}</ProgressBarInfo>

                {secondaryInfo && (
                    <>
                        <Dot />
                        <ProgressBarInfo secondary>{secondaryInfo}</ProgressBarInfo>
                    </>
                )}
            </ProgressBarLabel>
        </Root>
    );
};

export default ProgressBar;

const ProgressBarWrapper = styled.div<{ size: string }>`
    display: flex;
    height: ${p => p.size};
    background-color: ${theme.palette.grayScale.gray200};
    clip-path: polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%);
`;

const Root = styled.div`
    width: 100%;
`;

const Progress = styled.div<{ color: string; progress: number }>`
    width: ${p => num2proc(p.progress)};
    height: 100%;
    background-color: ${p => p.color};
    clip-path: polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%);
`;

const ProgressBarLabel = styled.div<{ small?: boolean }>`
    margin: ${px2rem(8)} 0 ${px2rem(8)} 0;
    ${({ small }) =>
        small
            ? css`
                  font-size: 16px;
                  line-height: 24px;
              `
            : css``}
`;

const ProgressBarInfo = styled(NormalLabel)<{ secondary?: boolean }>`
    color: ${p => (p.secondary ? theme.palette.grayScale.gray500 : p.color)};
`;
