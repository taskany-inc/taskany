import React from 'react';
import styled from 'styled-components';
import { FieldPath, FieldValues, FormState, UseFormRegister, RegisterOptions } from 'react-hook-form';

import { Input } from '../Input/Input';
import { base } from '../Input/mixins/base';

type TextAreaProps = React.ComponentProps<typeof Input>;

const StyledTextArea: React.FC<TextAreaProps> = styled.textarea`
    ${base}

    min-height: 100px;
`;

export const TextArea = (props) => <StyledTextArea {...props} />;

export const createFormTextAreaProps = (
    name: string,
    { register, formState }: { register: UseFormRegister<FieldValues>; formState: FormState<FieldValues> },
    inputProps?: TextAreaProps,
) => (options?: RegisterOptions<FieldValues, FieldPath<FieldValues>>) => ({
    ...inputProps,
    ...register(name, options),
    error: Boolean(formState.errors[name]),
});
