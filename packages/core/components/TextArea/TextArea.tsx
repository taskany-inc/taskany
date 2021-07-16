import React from 'react';
import styled from 'styled-components';
import { FieldPath, FieldValues, FormState, UseFormRegister, RegisterOptions } from 'react-hook-form';

import { Input } from '../Input/Input';
import { inputBoxStyles } from '../InputBox/InputBox';

type TextAreaProps = React.ComponentProps<typeof Input>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledTextArea = styled(({ error, forwardRef, ...props }) => <textarea ref={forwardRef} {...props} />)`
    ${inputBoxStyles}

    min-height: 100px;
`;

export const TextArea = React.forwardRef<TextAreaProps, TextAreaProps>((props, ref) => (
    <StyledTextArea forwardRef={ref} {...props} />
));

export const createFormTextAreaProps = (
    name: string,
    { register, formState }: { register: UseFormRegister<FieldValues>; formState: FormState<FieldValues> },
    inputProps?: TextAreaProps,
) => (options?: RegisterOptions<FieldValues, FieldPath<FieldValues>>) => ({
    ...inputProps,
    ...register(name, options),
    error: Boolean(formState.errors[name]),
});
