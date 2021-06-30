import React from 'react';
import styled, { css } from 'styled-components';
import NextLink from 'next/link';

import {
    buttonTextColor,
    buttonBackgroundColor,
    buttonBorderColor,
    buttonBackgroundColorHover,
    buttonBorderColorHover,
    buttonBoxShadow,
    buttonOutlineTextColor,
    buttonOutlineBackgroundColor,
    buttonOutlineBorderColor,
    buttonOutlineBackgroundColorHover,
    buttonOutlineBorderColorHover,
    buttonOutlineBoxShadow,
    buttonPrimaryTextColor,
    buttonPrimaryBackgroundColor,
    buttonPrimaryBorderColor,
    buttonPrimaryBackgroundColorHover,
    buttonPrimaryBorderColorHover,
} from '../../@generated/tokens';
import { is } from '../../utils/styles';

interface ButtonProps {
    disabled?: boolean;
    text: string;
    view?: 'default' | 'primary' | 'outline';
    size?: 's' | 'm' | 'l';
    type?: 'submit' | 'link';
    href?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    brick?: 'left' | 'right' | 'center';
}

const StyledButton = styled.button`
    position: relative;
    display: inline-block;
    font-weight: 500;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    outline: none;
    border: 1px solid;
    border-radius: 6px;
    appearance: none;
    transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color, border-color;

    span {
        display: inline-block;
        vertical-align: text-top;
    }

    :hover {
        transition-duration: 0.1s;
    }

    :disabled {
        cursor: default;
        opacity: 0.8;
        transition: none;
    }

    ${is(
        { size: 's' },
        css`
            padding: 3px 12px;

            font-size: 12px;
        `,
    )}

    ${is(
        { size: 'm' },
        css`
            padding: 5px 16px;

            font-size: 14px;
        `,
    )}

    ${is(
        { size: 'l' },
        css`
            padding: 0.75em 1.5em;

            font-size: 16px;
        `,
    )}

    ${is(
        { view: 'default' },
        css`
            color: ${buttonTextColor};
            border-color: ${buttonBorderColor};
            background-color: ${buttonBackgroundColor};
            box-shadow: ${buttonBoxShadow};

            :hover:not([disabled]) {
                border-color: ${buttonBorderColorHover};
                background-color: ${buttonBackgroundColorHover};
            }

            :active:not([disabled]) {
                background-color: ${buttonBackgroundColor};
            }
        `,
    )}

    ${is(
        { view: 'primary' },
        css`
            color: ${buttonPrimaryTextColor};
            border-color: ${buttonPrimaryBorderColor};
            background-color: ${buttonPrimaryBackgroundColor};

            :hover:not([disabled]) {
                border-color: ${buttonPrimaryBorderColorHover};
                background-color: ${buttonPrimaryBackgroundColorHover};
            }

            :active:not([disabled]) {
                background-color: ${buttonPrimaryBackgroundColor};
            }
        `,
    )}

    ${is(
        { view: 'outline' },
        css`
            color: ${buttonOutlineTextColor};
            border-color: ${buttonOutlineBorderColor};
            background-color: ${buttonOutlineBackgroundColor};
            box-shadow: ${buttonOutlineBoxShadow};

            :hover:not([disabled]) {
                border-color: ${buttonOutlineBorderColorHover};
                background-color: ${buttonOutlineBackgroundColorHover};
            }

            :active:not([disabled]) {
                background-color: ${buttonOutlineBackgroundColor};
            }
        `,
    )}

    ${is(
        { brick: 'left' },
        css`
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        `,
    )}

    ${is(
        { brick: 'right' },
        css`
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        `,
    )}

    ${is(
        { brick: 'center' },
        css`
            border-radius: 0;
        `,
    )}

    ${is(
        { type: 'link' },
        css`
            text-decoration: none;
        `,
    )}
`;

const StyledText = styled.span`
    display: inline-block;
`;

const ButtonForwarded = React.forwardRef<ButtonProps, Omit<ButtonProps, 'text'>>((props, ref) => (
    <StyledButton {...props} forwardRef={ref} />
));

export const Button: React.FC<ButtonProps> = ({ text, href = '#', ...props }) => {
    const content =
        props.iconLeft || props.iconRight
            ? [
                  props.iconLeft ? [props.iconLeft, ' '] : null,
                  <StyledText>{text}</StyledText>,
                  props.iconRight ? [' ', props.iconRight] : null,
              ]
            : text;

    return props.type === 'link' ? (
        <NextLink href={href} passHref>
            <ButtonForwarded {...props}>{content}</ButtonForwarded>
        </NextLink>
    ) : (
        <StyledButton {...props}>{content}</StyledButton>
    );
};

Button.defaultProps = {
    view: 'default',
    size: 'm',
};
