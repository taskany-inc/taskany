import React from 'react';
import styled from 'styled-components';
import { Button as ReakitButton, ButtonProps as ReakitButtonProps } from 'reakit/Button';

import { base } from './mixins/base';
import { CommonButtonProps } from './types/props';

type ButtonProps = ReakitButtonProps & CommonButtonProps;

const StyledButton = styled(ReakitButton)<ButtonProps>`
    ${base}
`;

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => (
    <StyledButton {...props}>
        <span>{text}</span>
    </StyledButton>
);
