import Dropdown from "components/dropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { routes } from "services/routes";
import styled from "styled-components";
import { breakPoints } from "styles/mq";
import { theme } from "styles/theme";
import { px2rem } from "styles/utils";
import MenuIcon from "./MenuIcon";
import MobileNavigation from "./MobileNavigation";
import { headerHeight } from "styles/global";

type HeaderProps = {
    items: CommonContent["header"];
};

const Header: React.FunctionComponent<HeaderProps> = props => {
    const { asPath } = useRouter();
    const [isOpenMobileNavigation, setIsOpenMobileNavigation] = useState(false);

    return (
        <>
            <Root>
                <Wrapper>
                    <MenuIcon open={() => setIsOpenMobileNavigation(true)} />
                    <LogoWrapper>
                        <Link href="/">
                            <a>
                                <MainLogo src={props.items.logo} />
                                <FoundationName src={props.items.title} />
                            </a>
                        </Link>
                    </LogoWrapper>
                    <Nav>
                        {routes.header.map(item => (
                            <Link href={item.to} key={item.to}>
                                <NavbarLink href={item.to}>
                                    {item.to === asPath ? (
                                        <SelectedNavItem>{item.name}</SelectedNavItem>
                                    ) : (
                                        <NavItem>{item.name}</NavItem>
                                    )}
                                </NavbarLink>
                            </Link>
                        ))}
                    </Nav>
                    <DropdownWrapper>
                        <Dropdown helpString={props.items.help} />
                    </DropdownWrapper>
                </Wrapper>
            </Root>

            <MobileNavigation isOpen={isOpenMobileNavigation} close={() => setIsOpenMobileNavigation(false)} />
        </>
    );
};

const Root = styled.header`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;

    height: ${px2rem(headerHeight)};
    padding: ${px2rem(50)};

    background-color: ${theme.palette.grayScale.white};
    @media (max-width: ${breakPoints.xl}) {
        padding: ${px2rem(20)};
        height: inherit;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: ${breakPoints.lg}) {
        justify-content: flex-start;
    }
`;

const LogoWrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;

    > a {
        display: flex;

        @media (max-width: ${breakPoints.lg}) {
            display: block;
            height: 100%;
        }
    }
`;

const MainLogo = styled.img`
    display: block;
    height: 100%;

    @media (max-width: ${breakPoints.lg}) {
        max-height: ${px2rem(40)};
    }
`;

const FoundationName = styled.img`
    margin-left: ${px2rem(18)};
    max-height: 100%;

    @media (max-width: ${breakPoints.xl}) {
        display: none;
    }
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: ${px2rem(560)};
    @media (max-width: ${breakPoints.lg}) {
        display: none;
    }
`;

export const NavItem = styled.h5`
    padding-bottom: ${px2rem(7)};
    cursor: pointer;
`;

export const SelectedNavItem = styled(NavItem)`
    color: ${theme.palette.brand.secondary500};
    border-bottom: 3px solid ${theme.palette.brand.secondary500};
`;

export const NavbarLink = styled.a`
    display: flex;
    justify-content: space-between;
    color: black;

    &:hover {
        text-decoration: none;
        color: ${theme.palette.brand.secondary500};
    }
`;

const DropdownWrapper = styled.div`
    @media (max-width: ${breakPoints.lg}) {
        display: none;
    }
`;

export default Header;
