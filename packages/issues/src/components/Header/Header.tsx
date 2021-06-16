import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { User } from '../User/User';
import { SearchInput } from '../SearchInput/SearchInput';
import { Dropdown, DropdownAnchor, useDropdownState } from '../Dropdown/Dropdown';

const iconProps: Omit<React.ComponentProps<typeof Icon>, 'type'> = {
    stroke: 1,
    color: '#fff',
    size: 's',
};

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    box-sizing: border-box;

    z-index: 1;

    padding: 16px 32px;

    font-size: 14px;
    line-height: 1.5;
    color: #f0f6fc;

    background-color: #161b22;
`;

const StyledHeaderItem = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    align-items: center;
    vertical-align: middle;

    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }
`;

const StyledHeaderItemFull = styled(StyledHeaderItem)`
    flex: auto;
`;

const StyledHeaderLink = styled.a`
    font-weight: 500;
    color: inherit;
    text-decoration: none;
    white-space: nowrap;

    cursor: pointer;
`;

const StyledHeaderIcon = styled(Icon)`
    display: inherit;
    display: flex;
    align-items: center;
`;

const StyledHeaderLinkIcon = styled(Icon)`
    display: inherit;
`;

const StyledHeaderIconLink = styled(StyledHeaderLink)`
    display: flex;
    align-items: center;
`;

const StyledHeaderNavLink = styled(StyledHeaderLink)`
    padding-top: 16px;
    padding-bottom: 16px;
    margin-bottom: -16px;
    margin-top: -16px;

    font-size: 12px;
`;

const StyledHeaderNav = styled.nav`
    padding: 0 16px;

    font-size: 12px;

    ${StyledHeaderLink} {
        margin-right: 16px;

        &:last-child {
            margin-right: 0;
        }
    }
`;

const StyledUser = styled(User)`
    display: flex;
    align-items: center;
`;

// TODO: move out to User
const HeaderUser: React.FC = () => {
    const [session, loading] = useSession();

    if (loading) {
        return <StyledHeaderIcon type="user" {...iconProps} />;
    }

    if (session) {
        return (
            <StyledHeaderLink
                href="/api/auth/signout"
                onClick={(e) => {
                    e.preventDefault();
                    signOut();
                }}
            >
                <StyledUser src={session.user?.image} />
            </StyledHeaderLink>
        );
    }

    return (
        <StyledHeaderNavLink
            href="/api/auth/signin"
            onClick={(e) => {
                e.preventDefault();
                signIn();
            }}
        >
            Sign in
        </StyledHeaderNavLink>
    );
};

const StyledHeaderCreationMenu = styled.div`
    color: #161b22;
`;

const HeaderCreationMenu: React.FC = () => (
    <StyledHeaderCreationMenu>
        <Link href="/queues/new">
            <StyledHeaderNavLink>New queue</StyledHeaderNavLink>
        </Link>
    </StyledHeaderCreationMenu>
);

export const Header: React.FC = () => {
    const dropdownState = useDropdownState();

    return (
        <StyledHeader>
            <StyledHeaderItem>
                <Logo />
            </StyledHeaderItem>

            <StyledHeaderItemFull>
                <SearchInput placeholder="Search" />

                <StyledHeaderNav>
                    <Link href="/">
                        <StyledHeaderNavLink>Dashboard</StyledHeaderNavLink>
                    </Link>

                    <Link href="/issues">
                        <StyledHeaderNavLink>Issues</StyledHeaderNavLink>
                    </Link>

                    <Link href="/explore">
                        <StyledHeaderNavLink>Explore</StyledHeaderNavLink>
                    </Link>
                </StyledHeaderNav>
            </StyledHeaderItemFull>

            <StyledHeaderItem>
                <Link href="/notifications">
                    <StyledHeaderIconLink>
                        <StyledHeaderLinkIcon type="bell" {...iconProps} />
                    </StyledHeaderIconLink>
                </Link>
            </StyledHeaderItem>

            <StyledHeaderItem>
                <DropdownAnchor {...dropdownState}>
                    <StyledHeaderLinkIcon type="plus" {...iconProps} />
                </DropdownAnchor>
                <Dropdown {...dropdownState}>
                    <HeaderCreationMenu />
                </Dropdown>
            </StyledHeaderItem>

            <StyledHeaderItem>
                <HeaderUser />
            </StyledHeaderItem>
        </StyledHeader>
    );
};
