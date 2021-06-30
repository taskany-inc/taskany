import React from 'react';
import styled from 'styled-components';
import { FieldPath, FieldValues, FormState, UseFormRegister, RegisterOptions } from 'react-hook-form';

import { base } from './mixins/base';

export interface InputProps {
    placeholder?: string;
    error?: boolean;
    value?: string;
    defaultValue?: string;
    name?: string;
    brick?: 'left' | 'right' | 'center';

    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledInput = styled(({ error, forwardRef, ...props }) => <input ref={forwardRef} {...props} />)<InputProps>`
    ${base}
`;

export const Input = React.forwardRef<InputProps, InputProps>((props, ref) => (
    <StyledInput forwardRef={ref} {...props} />
));

export const createFormInputProps = (
    name: string,
    { register, formState }: { register: UseFormRegister<FieldValues>; formState: FormState<FieldValues> },
    inputProps?: InputProps,
) => (options?: RegisterOptions<FieldValues, FieldPath<FieldValues>>) => ({
    ...inputProps,
    ...register(name, options),
    error: Boolean(formState.errors[name]),
});
