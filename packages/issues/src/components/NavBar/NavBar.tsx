import React, { createContext, useContext } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { navBarBorderColorHover, navBarPrimaryColor, textColorPrimary, textColorTertiary } from '@/generated/tokens';

import { is } from '../../utils/styles';

interface NavBarProps {
    url?: string;
}

interface NavBarLinkProps {
    url?: string;
    icon?: React.ReactNode;
    text: string;
}

const NavBarContext = createContext<NavBarProps>({});

const StyledNavBar = styled.div`
    display: flex;
`;
const StyledNavBarLinkIcon = styled.span`
    display: inline-block;
    margin-right: 8px;
    vertical-align: middle;
`;
const StyledNavBarLinkText = styled.span`
    display: inline-block;
    vertical-align: middle;
`;
const StyledNavBarLinkBase = styled.a``;
const StyledNavBarLink = styled(({ selected, ...props }) => <StyledNavBarLinkBase {...props} />)`
    display: flex;
    align-items: center;

    padding: 8px 16px;
    margin-right: 3px;

    font-size: 14px;
    line-height: 30px;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;

    color: ${textColorPrimary};

    ${StyledNavBarLinkIcon} {
        color: ${textColorTertiary};
    }

    &:hover {
        border-color: ${navBarBorderColorHover};
    }

    &:last-child {
        margin-right: 0;
    }

    border-bottom: 2px solid transparent;

    ${is(
        { selected: true },
        css`
            ${StyledNavBarLinkIcon} {
                color: ${textColorPrimary};
            }

            font-weight: 600;

            border-color: ${navBarPrimaryColor};

            &:hover {
                border-color: ${navBarPrimaryColor};
            }
        `,
    )}
`;

const NavBarLinkForwarded = React.forwardRef<any, any>((props, ref) => (
    <StyledNavBarLink {...props} forwardRef={ref} />
));

export const NavBar: React.FC<NavBarProps> = ({ url, children }) => (
    <NavBarContext.Provider value={{ url }}>
        <StyledNavBar>{children}</StyledNavBar>
    </NavBarContext.Provider>
);

export const NavBarLink: React.FC<NavBarLinkProps> = ({ url, icon, text }) => {
    const { url: currentUrl } = useContext(NavBarContext);
    const isSelected = currentUrl && url && currentUrl === url;
    const Wrapper = url
        ? ({ children }) => (
              <Link href={url} passHref>
                  {children}
              </Link>
          )
        : ({ children }) => <>{children}</>;

    return (
        <Wrapper>
            <NavBarLinkForwarded selected={isSelected}>
                {icon && <StyledNavBarLinkIcon>{icon}</StyledNavBarLinkIcon>}
                <StyledNavBarLinkText>{text}</StyledNavBarLinkText>
            </NavBarLinkForwarded>
        </Wrapper>
    );
};
