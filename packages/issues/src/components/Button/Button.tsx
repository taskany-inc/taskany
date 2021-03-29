import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import {
    buttonTextColor,
    buttonBackgroundColor,
    buttonBorderColor,
    buttonBackgroundColorHover,
    buttonBorderColorHover,
    buttonPrimaryTextColor,
    buttonPrimaryBackgroundColor,
    buttonPrimaryBorderColor,
    buttonPrimaryBackgroundColorHover,
    buttonPrimaryBorderColorHover,
} from '../../@generated/tokens';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    text: string;
    view?: 'default' | 'primary';
}

const StyledButton = styled.button<ButtonProps>`
    position: relative;
    display: inline-block;
    padding: 5px 16px;
    font-size: 14px;
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

    :hover {
        transition-duration: 0.1s;
    }

    :disabled {
        cursor: default;
        opacity: 0.8;
        transition: none;
    }

    ${({ view }) =>
        ({
            default: css`
                color: ${buttonTextColor};
                border-color: ${buttonBorderColor};
                background-color: ${buttonBackgroundColor};

                :hover:not([disabled]) {
                    border-color: ${buttonBorderColorHover};
                    background-color: ${buttonBackgroundColorHover};
                }

                :active:not([disabled]) {
                    background-color: ${buttonBackgroundColor};
                }
            `,
            primary: css`
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
        }[view])}
`;
const StyledButtonInner = styled.span``;

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
    return (
        <StyledButton {...props}>
            <StyledButtonInner>{text}</StyledButtonInner>
        </StyledButton>
    );
};
