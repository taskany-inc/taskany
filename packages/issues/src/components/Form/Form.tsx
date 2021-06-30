/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled, { css } from 'styled-components';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormState, useForm, UseFormProps } from 'react-hook-form';
import * as zod from 'zod';

import { textColorDanger, textColorSecondary } from '../../@generated/tokens';
import { is } from '../../utils/styles';

interface FormFieldProps {
    label?: string;
    name?: string;
    required?: boolean;
    info?: string;
    type: 'input' | 'textarea' | 'markdown' | 'complex';
    error?: FormState<FieldValues>['errors'];
}

interface FormProps {
    onSubmit?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLabel = styled(({ error, ...props }) => <label {...props} />)<{
    required?: boolean;
    error?: boolean;
}>`
    display: block;
    padding-left: 2px;
    padding-bottom: 5px;
    font-size: 14px;

    ${is(
        { required: true },
        css`
            ::after {
                content: '*';
                display: inline;
                padding-left: 5px;
                color: ${textColorDanger};
            }
        `,
    )}

    ${is(
        { error: true },
        css`
            color: ${textColorDanger};
        `,
    )}
`;

const StyledFormFieldInfo = styled.div`
    display: inline-block;
    padding-top: 4px;
    padding-left: 3px;

    font-size: 12px;
    color: ${textColorSecondary};
`;

const StyledFormFieldBase = styled.div`
    padding: 15px 0;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledFormField = styled(({ type, ...props }) => <StyledFormFieldBase {...props} />)<{
    type?: FormFieldProps['type'];
}>`
    ${is(
        { type: 'input' },
        css`
            padding: 8px;
        `,
    )}

    ${is(
        { type: 'complex' },
        css`
            padding: 8px;

            display: flex;
        `,
    )}

    ${is(
        { type: 'textarea' },
        css`
            padding: 8px;
        `,
    )}
`;

export const Form: React.FC<FormProps> = styled.form`
    max-width: 100%;
`;

export const FormActions: React.FC = styled.div`
    padding: 15px 8px 8px;

    text-align: right;
`;

export const FormField: React.FC<FormFieldProps> = ({ name, required, label, info, type, error, children }) => {
    const infoMessage = error ? error.message || info : info;

    const labelRenderer = label ? (
        <StyledLabel required={required} error={error} htmlFor={name}>
            {label}
        </StyledLabel>
    ) : null;

    return (
        <StyledFormField type={type}>
            {labelRenderer}
            {children}
            {infoMessage && <StyledFormFieldInfo>{infoMessage}</StyledFormFieldInfo>}
        </StyledFormField>
    );
};

interface FormStateProps extends UseFormProps {
    schema?: zod.ZodObject<any>;
}

export function useFormState(props: FormStateProps = {}) {
    const { schema, ...defaultProps } = props;
    return schema
        ? useForm({
              ...defaultProps,
              resolver: zodResolver(schema),
          })
        : useForm(defaultProps);
}

export * as schema from 'zod';
