import React from 'react';
import styled from 'styled-components';
import { Button as ReakitButton, ButtonProps as ReakitButtonProps } from 'reakit/Button';

import { base } from './mixins/base';
import { CommonButtonProps } from './types/props';

type ButtonProps = Omit<
    ReakitButtonProps,
    'unstable_clickOnEnter' | 'unstable_clickOnSpace' | 'unstable_system' | 'focusable' | 'wrapElement'
> &
    CommonButtonProps;

const StyledButton = styled(ReakitButton)<ButtonProps>`
    ${base}
`;

const StyledText = styled.span`
    display: inline-block;
`;

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
    const content =
        props.iconLeft || props.iconRight
            ? [
                  props.iconLeft ? [props.iconLeft, ' '] : null,
                  <StyledText>{text}</StyledText>,
                  props.iconRight ? [' ', props.iconRight] : null,
              ]
            : text;

    return (
        <StyledButton {...props} unstable_clickOnEnter unstable_clickOnSpace>
            {content}
        </StyledButton>
    );
};

Button.defaultProps = {
    view: 'default',
    size: 'm',
};
