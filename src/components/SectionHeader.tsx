import React from "react";
import Row from "react-bootstrap/Row";
import styled, { css } from "styled-components";
import { breakPoints } from "styles/mq";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";

type SectionHeaderProps = {
    extras?: React.ReactNode;
    responsiveSize?: boolean;
};

const SectionHeader: React.FunctionComponent<SectionHeaderProps> = ({ children, extras, responsiveSize }) => {
    return (
        <HeaderContainer>
            <Label responsiveSize={responsiveSize}>{children}</Label>
            {extras && <div>{extras}</div>}
        </HeaderContainer>
    );
};

const HeaderContainer = styled(Row)`
    margin: 0 0 ${px2rem(40)};
    align-items: center;
    justify-content: space-between;
`;

const Label = styled.h2<{ responsiveSize?: boolean }>`
    color: ${theme.palette.grayScale.gray900};

    ${({ responsiveSize }) =>
        responsiveSize
            ? css`
                  @media (max-width: ${breakPoints.xl}) {
                      font-size: 1.6rem;
                      line-height: 1.2;
                  }
              `
            : undefined};
`;

export default SectionHeader;
