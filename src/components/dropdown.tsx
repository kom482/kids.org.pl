import ChevronDown from "images/chevron-down.svg?react";
import ChevronUp from "images/chevron-up.svg?react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { routes } from "services/routes";
import styled from "styled-components";
import { resetButton } from "styles/resets";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import { hexToRGBA } from "utils/hexToRgb";
import EmphasizedLink from "./EmphasizedLink";
import Link from "./Link";

const Root = styled.div`
    position: relative;
    width: ${px2rem(240)};
`;

export const DropdownButton = styled.button`
    ${resetButton}
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 100%;
    height: ${px2rem(48)};
    padding: 0 ${px2rem(16)};
    color: ${theme.palette.grayScale.white};
    background-color: ${theme.palette.brand.primary500};
    font-weight: 700;
    cursor: pointer;
`;

const Text = styled.h5`
    margin: 0;
    color: ${theme.palette.grayScale.white};
    font-size: 20px;
    text-transform: uppercase;
`;

const DropdownItemsWrapper = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    margin-top: 5px;
    flex-direction: column;
    border: 2px solid ${theme.palette.brand.primary500};
    box-shadow: ${theme.palette.shadow.primary};
    background-color: ${theme.palette.grayScale.white};
`;

const StyledEmphasizedLink = styled(EmphasizedLink)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: ${px2rem(16)};

    &:hover {
        background-color: ${hexToRGBA("#ED217D", 0.1)};
    }
`;

const IconWrapper = styled.div`
    margin-top: -0.5rem;
`;

type DropdownProps = {
    helpString: string;
};

const Dropdown = (props: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const isOpenRef = useRef(isOpen);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    useEffect(() => {
        function handleDocumentClick(event: MouseEvent | TouchEvent) {
            if (!rootRef.current?.contains(event.target as any) && isOpenRef.current) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleDocumentClick, false);
        document.addEventListener("touchend", handleDocumentClick, false);

        return () => {
            document.removeEventListener("click", handleDocumentClick, false);
            document.removeEventListener("touchend", handleDocumentClick, false);
        };
    }, []);

    const handleElementClick = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <div ref={rootRef}>
            <Root>
                <DropdownButton onClick={() => setIsOpen(!isOpen)}>
                    <Text>{props.helpString}</Text>
                    <IconWrapper>{isOpen ? <ChevronUp /> : <ChevronDown />}</IconWrapper>
                </DropdownButton>
                {isOpen && (
                    <DropdownItemsWrapper>
                        {routes.helpButton.map((item, idx) => (
                            <Link key={idx} to={item.to} external={item.external} >
                                <StyledEmphasizedLink fullWidth onClick={handleElementClick}>
                                    {item.name}
                                </StyledEmphasizedLink>
                            </Link>
                        ))}
                    </DropdownItemsWrapper>
                )}
            </Root>
        </div>
    );
};

export default Dropdown;
