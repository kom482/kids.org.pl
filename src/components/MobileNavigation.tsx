import chevronRight from "images/chevron-right.svg?url";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { routes } from "services/routes";
import styled from "styled-components";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import { hexToRGBA } from "utils/hexToRgb";
import { DropdownButton } from "./dropdown";
import { ChevronRightWhite, CloseIconSecondary } from "./styledIcons";
import Link from "./Link";

export interface MobileNavigationProps {
    isOpen: boolean;
    close: () => void;
}

const MobileNavigation = (props: MobileNavigationProps) => {
    const { asPath } = useRouter();
    useEffect(() => {
        const oldOverflow = document.body.style.overflow;
        props.isOpen ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");
    }, [props.isOpen]);
    return (
        <Root isOpen={props.isOpen}>
            {props.isOpen && (
                <Wrapper>
                    <TopNavigation>
                        <Cross onClick={props.close} />
                        {routes.header.map(item => (
                            <Link to={item.to} key={item.to}>
                                <MainNavLink href={item.to} onClick={props.close}>
                                    {item.to === asPath ? (
                                        <SelectedMainNavItem>{item.name}</SelectedMainNavItem>
                                    ) : (
                                        <MainNavItem>{item.name}</MainNavItem>
                                    )}
                                    <img src={chevronRight} />
                                </MainNavLink>
                            </Link>
                        ))}
                    </TopNavigation>
                    <BottomNavigation>
                        {routes.helpButton.map(item => (
                            <Link to={item.to} key={item.name} external={item.external}>
                                <DropdownButton onClick={props.close}>
                                    <div>{item.name}</div>
                                    <ChevronRightWhite />
                                </DropdownButton>
                            </Link>
                        ))}
                    </BottomNavigation>
                </Wrapper>
            )}
        </Root>
    );
};

const Root = styled.div<{ isOpen: boolean }>`
    width: ${p => (p.isOpen ? "100vw" : 0)};
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100000;
    position: fixed;
    display: flex;
    background-color: ${hexToRGBA(theme.palette.brand.secondary500, 0.8)};
    opacity: ${p => (p.isOpen ? 1 : 0)};
    transition: opacity 0.3s linear;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 0;
    padding: 0;
    width: 70%;
    overflow: auto;
    background-color: ${theme.palette.grayScale.white};
`;

const TopNavigation = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${px2rem(16)};
`;
const BottomNavigation = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: ${px2rem(64)};
    background-color: ${theme.palette.brand.primary500};
`;

const Cross = styled(CloseIconSecondary)`
    width: 50px;
    height: 50px;
    margin-bottom: ${px2rem(16)};
`;

const MainNavItem = styled.h5`
    color: ${theme.palette.grayScale.gray800};
`;

const SelectedMainNavItem = styled(MainNavItem)`
    color: ${theme.palette.brand.secondary500};
`;

const MainNavLink = styled.a`
    margin-bottom: ${px2rem(16)};
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    outline: none;
`;
export default MobileNavigation;
