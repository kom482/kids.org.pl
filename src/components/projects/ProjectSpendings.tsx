import SectionHeader from "components/SectionHeader";
import SectionSubHeader from "components/SectionSubHeader";
import { NormalLabel } from "components/typography";
import { RichText } from "prismic-reactjs";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import { formatMoney } from "utils/money";

type ProjectSpendingsProps = {
    spendings: ProjectNode["planned_spendings"];
    description: ProjectNode["planned_spendings_description"];
};

export const ProjectSpendings: React.FunctionComponent<ProjectSpendingsProps> = ({ description, spendings }) => {
    return (
        <div>
            <Row>
                <Col md="4">
                    <Header>
                        <SectionSubHeader title={"Zaplanowane wydatki"} gray />
                        {description && <SectionHeader>{RichText.asText(description)}</SectionHeader>}
                    </Header>
                </Col>
                <Col md="8">
                    <SpendingTiles>
                        {spendings &&
                            spendings.map((s, ind) => (
                                <SpendingTile key={ind}>
                                    {s.value !== undefined && s.value !== null && (
                                        <MoneyAmount>{formatMoney(s.value)} zł</MoneyAmount>
                                    )}
                                    {s.name && <NormalLabel>{RichText.asText(s.name)}</NormalLabel>}
                                </SpendingTile>
                            ))}
                    </SpendingTiles>
                </Col>
            </Row>
        </div>
    );
};

const Header = styled.div`
    padding: ${px2rem(36)} ${px2rem(8)} 0;
`;

const SpendingTiles = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${px2rem(336)}, 1fr));
    row-gap: ${px2rem(30)};
    column-gap: ${px2rem(30)};
    grid-auto-flow: row;
`;

const SpendingTile = styled.div`
    border: 2px solid ${theme.palette.grayScale.gray100};
    padding: ${px2rem(40)};
`;

const MoneyAmount = styled.h2`
    color: ${theme.palette.grayScale.gray900};
`;
