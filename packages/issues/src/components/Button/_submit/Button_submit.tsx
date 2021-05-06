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

export const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ text, fields, state, ...props }) => (
    <StyledButtonSubmit unstable_clickOnEnter {...state} {...props}>
        <span>{text}</span>
    </StyledButtonSubmit>
);
