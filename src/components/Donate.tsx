import RadioButton from "components/RadioButton";
import { FunctionComponent, useCallback, useState, ReactNode, useMemo } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Sticky from "react-sticky-el";
import styled, { css } from "styled-components";
import { breakPoints } from "styles/mq";
import { resetInput } from "styles/resets";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import { headerHeight } from "styles/global";
import Button from "./Button";
import CropCorner from "./CropCorner";

const DonateContainer = styled.div`
    padding: ${px2rem(40)};
    background-color: ${theme.palette.brand.secondary500};
    @media (max-width: ${breakPoints.sm}) {
        padding: ${px2rem(24)};
    }
`;

const Title = styled.h4`
    color: ${theme.palette.grayScale.white};
    @media (max-width: ${breakPoints.sm}) {
        font-size: ${px2rem(20)};
        line-height: ${px2rem(24)};
    }
`;

const AmountOptions = styled.div`
    display: flex;
    margin: ${px2rem(24)} 0;
`;

const DonateButton = styled(Button)`
    width: 100%;
    text-transform: uppercase;
`;

const StickyBarContainer = styled(Sticky)`
    > div {
        z-index: 1;
        top: calc(${px2rem(headerHeight)} + ${px2rem(12)}) !important;
    }

    @media (max-width: ${breakPoints.sm}) {
        display: none;
    }
`;

const StickyBar = styled.div<{ visible?: boolean }>`
    background-color: ${theme.palette.brand.secondary500};
    height: ${px2rem(108)};
    padding: ${px2rem(16)};
    ${p =>
        p.visible
            ? css`
                display: block;
              `
            : css`
                display: none;
            `}
`;

const StickyBarRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const StickyBarName = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 40%;
`;

const StickyBarDonations = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    > * {
        margin-left: ${px2rem(36)}
    }
`;

const StickyBarTitle = styled.h4`
    color: ${theme.palette.grayScale.white};
    font-size: 1.25rem;
`;

type Donation = { option: "10" | "50" | "100"; } | { option: "custom"; value: string; }

function useDonations(projectId: string, projectName: string, smallInput?: boolean): [Record<"10" | "50" | "100" | "custom", ReactNode>, () => void] {
    const [donation, setDonation] = useState<Donation>({ option: "10" });

    const setOnlyNumericValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;

        if (e.target.value === "" || re.test(e.target.value)) {
            setDonation({
                option: "custom",
                value: e.target.value,
            });
        }
    }, []);

    const setPredefinedDonation = useCallback((predefinedDonation: Exclude<typeof donation["option"], "custom">) => {
        setDonation({ option: predefinedDonation });
    }, []);

    const donate = useCallback(() => {
        let amount: number;

        switch (donation.option) {
            case "10":
                amount = 10;
                break;
            case "50":
                amount = 50;
                break;
            case "100":
                amount = 100;
                break;
            case "custom":
                amount = Number(donation.value);
                break;
        }

        if (amount < 1) {
            return;
        }

        const query = new URLSearchParams({
            amount: amount.toString(),
            projectName,
        });

        location.href = `/donate/${projectId}?${query}`;
    }, [donation, projectName, projectId]);

    const donationOptions: Record<"10" | "50" | "100" | "custom", ReactNode> = useMemo(() => ({
        10: (
            <RadioButton
                name="donation"
                label={"10 PLN"}
                checked={donation.option === "10"}
                onChange={() => setPredefinedDonation("10")}
            />
        ),
        50: (
            <RadioButton
                name="donation"
                label={"50 PLN"}
                checked={donation.option === "50"}
                onChange={() => setPredefinedDonation("50")}
            />
        ),
        100: (
            <RadioButton
                name="donation"
                label={"100 PLN"}
                checked={donation.option === "100"}
                onChange={() => setPredefinedDonation("100")}
            />
        ),
        custom: (
            <RadioButton
                name="donation"
                label={
                    donation.option === "custom" ? (
                        <CustomValue>
                            <CustomValueInput
                                value={donation.value}
                                onChange={setOnlyNumericValue}
                                placeholder={smallInput ? "Kwota" : "Podaj kwotę"}
                                autoFocus
                                small={smallInput}
                            />
                            <CustomValueAmount>PLN</CustomValueAmount>
                        </CustomValue>
                    ) : (
                        "Inna Kwota"
                    )
                }
                checked={donation.option === "custom"}
                onChange={() => {
                    setDonation({
                        option: "custom",
                        value: "",
                    });
                }}
            />
        ),
    }), [donation, smallInput]);

    return [donationOptions, donate];
}

type DonateProps = {
    projectId: string;
    projectName: string;
};

const Donate: FunctionComponent<DonateProps> = ({ projectId, projectName, ...props }) => {
    const [donationOptions, donate] = useDonations(projectId, projectName);

    return (
        <>
        <CropCorner topRight>
            <DonateContainer>
                <Title>Wesprzyj ten projekt</Title>
                <AmountOptions>
                    <DonateRow>
                        <Col sm={5}>
                            {donationOptions["10"]}
                        </Col>
                        <Col sm={7}>
                            {donationOptions["50"]}
                        </Col>
                        <Col sm={5}>
                            {donationOptions["100"]}
                        </Col>
                        <Col sm={7}>
                            {donationOptions["custom"]}
                        </Col>
                    </DonateRow>
                </AmountOptions>
                <DonateButton inverted onClick={donate}>
                    Wpłać
                </DonateButton>
            </DonateContainer>
        </CropCorner>
        </>
    );
};

export const DonateStickyBar: FunctionComponent<DonateProps> = ({ projectId, projectName, ...props }) => {
    const [donationOptions, donate] = useDonations(projectId, projectName, true);

    const [visible, setVisible] = useState(false);

    return (
        <StickyBarContainer bottomOffset={0} onFixedToggle={(fixed: boolean) => setVisible(fixed)}>
            <StickyBar visible={visible}>
                <StickyBarRow>
                    <StickyBarName>
                        <StickyBarTitle>{projectName}</StickyBarTitle>
                    </StickyBarName>
                    <StickyBarDonations>
                        {donationOptions["10"]}
                        {donationOptions["50"]}
                        {donationOptions["custom"]}
                        <Button inverted onClick={donate}>
                            Wpłać
                        </Button>
                    </StickyBarDonations>
                </StickyBarRow>
            </StickyBar>
        </StickyBarContainer>
    );
};

export default Donate;

const CustomValue = styled.div`
    display: flex;
    align-items: center;
`;

const DonateRow = styled(Row)`
    width: 100%;
`;

const CustomValueInput = styled.input<{ small?: boolean }>`
    ${resetInput};
    flex: 1 1 auto;
    min-width: 0;

    display: block;
    padding: ${px2rem(8)};
    margin: 0;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 1;
    border: 1px solid white;
    color: ${theme.palette.grayScale.white};
    background-color: transparent;

    ${p =>
        p.small
            ? css`
                max-width: 100px;
              `
            : css``}

    &::placeholder {
        color: ${theme.palette.grayScale.white};
        opacity: 0.5;
    }
`;

const CustomValueAmount = styled.div`
    flex: 0 0 auto;
    margin-left: ${px2rem(8)};
`;
