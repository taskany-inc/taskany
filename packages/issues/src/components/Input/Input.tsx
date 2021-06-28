import React from 'react';
import styled from 'styled-components';
import { FieldPath, FieldValues, FormState, UseFormRegister, RegisterOptions } from 'react-hook-form';

import { base } from './mixins/base';

type InputProps = {
    error?: boolean;
    value?: string;
    defaultValue?: string;
    name?: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
    brick?: 'left' | 'right' | 'center';
};

const StyledInput = styled(({ error, forwardRef, ...props }) => <input ref={forwardRef} {...props} />)<InputProps>`
    ${base}
`;

export const Input = React.forwardRef<InputProps, InputProps>((props, ref) => (
    <StyledInput forwardRef={ref} {...props} />
));

export const createFormInputProps = (
    name: string,
    { register, formState }: { register: UseFormRegister<FieldValues>; formState: FormState<FieldValues> },
) => (options?: RegisterOptions<FieldValues, FieldPath<FieldValues>>) => ({
    ...register(name, options),
    error: Boolean(formState.errors[name]),
});
