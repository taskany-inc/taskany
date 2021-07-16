import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

import { linkTextColor } from '../../tokens';

type NextLinkProps = React.ComponentProps<typeof NextLink>;

const StyledLink = styled.a`
    color: ${linkTextColor};
    font-size: inherit;
    text-decoration: none;
`;

const LinkForwarded = React.forwardRef<any, any>((props, ref) => <StyledLink {...props} forwardRef={ref} />);

const StyledInlineLink = styled.a`
    color: inherit;
    font-size: inherit;
    text-decoration: none;

    &:hover {
        color: ${linkTextColor};
    }
`;

const InlineLinkForwarded = React.forwardRef<any, any>((props, ref) => (
    <StyledInlineLink {...props} forwardRef={ref} />
));

const linkTypeMap = {
    default: LinkForwarded,
    inline: InlineLinkForwarded,
};

interface LinkProps extends NextLinkProps {
    type?: keyof typeof linkTypeMap;
}

export const Link: React.FC<LinkProps> = ({ type = 'default', children, ...props }) => {
    const Component = linkTypeMap[type];

    return (
        <NextLink {...props} passHref>
            <Component>{children}</Component>
        </NextLink>
    );
};
