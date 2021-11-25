import EmphasizedLink from "components/EmphasizedLink";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { ChevronRightPrimary } from "components/styledIcons";
import Tiles, { Tile } from "components/Tiles";
import { SmallLabel } from "components/typography";
import React from "react";
import { routes } from "services/routes";
import styled from "styled-components";
import { breakPoints } from "styles/mq";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import { hexToRGBA } from "utils/hexToRgb";
import CompanyTile from "./CompanyTile";

type SupportsUsProps = {
    companies: CompanyNode[];
};

const SupportsUs: React.FunctionComponent<SupportsUsProps> = ({ companies }) => (
    <Section>
        <SectionHeader extras={<EmphasizedLink href="/partners">Zobacz wszystkie firmy</EmphasizedLink>}>
            Wspierają nas
        </SectionHeader>

        <Tiles>
            {companies.map((company, i) => (
                <CompanyTile company={company} key={i} />
            ))}

            <LastTile href={routes.other.partners.to}>
                <CanHelp>Twoja firma może nam pomóc?</CanHelp>
                <SeeHow>
                    <Text>Dowiedz sie jak</Text>
                    <ChevronRightPrimary />
                </SeeHow>
            </LastTile>
        </Tiles>
    </Section>
);

const LastTile = styled(Tile)`
    display: block;
    background-color: ${hexToRGBA(theme.palette.brand.primary500, 0.1)};
`;

const CanHelp = styled.h5`
    color: ${theme.palette.grayScale.black};
    @media (max-width: ${breakPoints.sm}) {
        font-size: ${px2rem(16)};
        line-height: ${px2rem(20)};
    }
`;

const SeeHow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Text = styled(SmallLabel)`
    margin: 0;
    color: ${theme.palette.brand.primary500};

    @media (max-width: ${breakPoints.sm}) {
        font-size: ${px2rem(12)};
    }
`;

export default SupportsUs;
