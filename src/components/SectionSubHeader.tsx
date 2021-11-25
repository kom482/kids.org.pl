import React from "react";
import styled from "styled-components";
import { theme } from "styles/theme";

type SectionSubHeaderProps = {
    title?: React.ReactNode;

    gray?: boolean;
};

const SectionSubHeader: React.FunctionComponent<SectionSubHeaderProps> = ({ children, title, gray }) => {
    return (
        <div>
            {title && <Title gray={gray}>{title}</Title>}
            <h3>{children}</h3>
        </div>
    );
};

const Title = styled.h5<{ gray?: boolean }>`
    color: ${props => (props.gray ? theme.palette.grayScale.gray500 : theme.palette.brand.secondary500)};
`;

export default SectionSubHeader;
