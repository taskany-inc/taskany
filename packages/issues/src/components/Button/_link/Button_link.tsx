import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

import { base } from '../mixins/base';
import { CommonButtonProps } from '../types/props';

interface ButtonLinkProps extends CommonButtonProps {
    href: string;
}

const StyledButtonLink = styled.a`
    ${base}

    text-decoration: none;
`;

const ButtonLinkForwarded = React.forwardRef<any, any>((props, ref) => (
    <StyledButtonLink {...props} forwardRef={ref} />
));

export const ButtonLink: React.FC<ButtonLinkProps> = ({ href, text, ...props }) => (
    <NextLink href={href} passHref>
        <ButtonLinkForwarded {...props}>{text}</ButtonLinkForwarded>
    </NextLink>
);
