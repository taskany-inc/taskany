import React from 'react';
import styled from 'styled-components';
import {
    unstable_FormSubmitButton as ReakitButton,
    unstable_FormSubmitButtonProps as ReakitButtonProps,
} from 'reakit/Form';

import { base } from '../mixins/base';
import { CommonButtonProps } from '../types/props';
import { FormProps } from '../../Form/Form';

type ButtonSubmitProps = CommonButtonProps & FormProps;

const StyledButtonSubmit = styled(ReakitButton)<ReakitButtonProps>`
    ${base}
`;

const StyledText = styled.span`
    display: inline-block;
`;

export const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ text, fields, state, ...props }) => {
    const content =
        props.iconLeft || props.iconRight
            ? [
                  props.iconLeft ? [props.iconLeft, ' '] : null,
                  <StyledText>{text}</StyledText>,
                  props.iconRight ? [' ', props.iconRight] : null,
              ]
            : text;

    return (
        <StyledButtonSubmit unstable_clickOnEnter {...state} {...props}>
            {content}
        </StyledButtonSubmit>
    );
};

ButtonSubmit.defaultProps = {
    view: 'default',
    size: 'm',
};
