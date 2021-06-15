/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-else-return */
import React from 'react';
import styled, { css } from 'styled-components';
import {
    unstable_FormState,
    unstable_useFormState,
    unstable_FormInitialState,
    unstable_Form as ReakitForm,
    unstable_FormLabel as ReakitLabel,
} from 'reakit/Form';
import * as zod from 'zod';
import { textColorDanger, textColorSecondary } from '@/generated/tokens';

import { is } from '../../utils/styles';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../TextArea/TextArea';
import { MarkdownEditor } from '../MarkdownEditor/MarkdownEditor';

interface FormFieldProps {
    type: keyof typeof supportedFormFieldControls;
    label?: string;
    state?: unstable_FormState<any>;
    name?: string;
    required?: boolean;
    value?: any;
    placeholder?: string;
    info?: string;
    schema?: zod.ZodObject<any>;
    onChange?: (e: React.FormEvent) => void;
}

export interface FormProps {
    fields: Record<string, FormFieldProps>;
    state: unstable_FormState<any>;
}

type FieldsMap = Record<string, FormFieldProps>;

type onOriginValidate = unstable_FormInitialState<any>['onValidate'];
interface FormStateProps<F extends FieldsMap> {
    fields: F;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    schema?: zod.ZodObject<any>;
    onValidate?: (values: any) => ReturnType<NonNullable<onOriginValidate>>;
    onSubmit?: (values: any) => void;
}

export type FormErrors<F> = Partial<Record<keyof F, string>>;

const StyledLabel = styled(({ error, ...props }) => <ReakitLabel {...props} />)<{
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
    font-size: 12px;
    padding-top: 4px;
    padding-left: 3px;
    color: ${textColorSecondary};
`;

const StyledFormFieldBase = styled.div`
    padding: 15px 0;
`;

const StyledFormField = styled(({ type, ...props }) => <StyledFormFieldBase {...props} />)<{
    type?: keyof typeof supportedFormFieldControls;
}>`
    ${is(
        { type: 'input' },
        css`
            padding: 8px;
        `,
    )}

    ${is(
        { type: 'textarea' },
        css`
            padding: 8px;
        `,
    )}
`;

const StyledForm = styled(ReakitForm)`
    max-width: 100%;
`;

const StyledFormActions = styled.div`
    padding: 15px 8px 8px;

    text-align: right;
`;

const supportedFormFieldControls = {
    input: Input,
    textarea: TextArea,
    markdown: MarkdownEditor,
};

const isRequiredField = (schema: zod.ZodObject<any>, name: string) =>
    !schema.shape[name]?._def.options
        ? true
        : !schema.shape[name]._def.options.filter((s) => s._def.t === 'undefined').length;

const FormField: React.FC<FormFieldProps> = ({
    name,
    required,
    label,
    placeholder,
    info,
    type,
    state,
    schema,
    onChange,
    value,
}) => {
    const Control = supportedFormFieldControls[type];
    const invalid = state && name ? Boolean(state.errors[name]) || undefined : false;
    const infoMessage = state && name ? state.errors[name] || info : info;
    const isRequired = schema && name ? isRequiredField(schema, name) : required;

    return (
        <StyledFormField type={type}>
            {label && (
                <StyledLabel {...state} required={isRequired} error={invalid} htmlFor={name}>
                    {label}
                </StyledLabel>
            )}
            <Control
                {...state}
                name={name}
                placeholder={placeholder}
                error={invalid}
                id={name}
                onChange={onChange}
                value={value}
                autoComplete="off"
            />
            {infoMessage && <StyledFormFieldInfo>{infoMessage}</StyledFormFieldInfo>}
        </StyledFormField>
    );
};

export const Form: React.FC<FormProps> = ({ fields, state, children }) => (
    <StyledForm {...state}>
        {Object.keys(fields).map((name, i) => (
            <FormField key={i} {...fields[name]} />
        ))}
        <StyledFormActions>{children}</StyledFormActions>
    </StyledForm>
);

export function useFormState<F extends FieldsMap>(props: FormStateProps<F>) {
    const values = {};

    Object.keys(props.fields).forEach((name) => {
        values[name] = props.fields[name].value;
    });

    const state = unstable_useFormState({
        values: values as F,
        validateOnBlur: props.validateOnBlur,
        validateOnChange: props.validateOnChange,
        onValidate: (v: F) => {
            if (props.schema) {
                const { schema } = props;
                const preValidation = schema.safeParse(v);

                if (preValidation.success) {
                    return props.onValidate ? props.onValidate(v) : null;
                }

                const errors = {};
                for (const { path, message } of (preValidation as { success: false; error: zod.ZodError }).error
                    .errors) {
                    // TODO: support deep schemas
                    errors[path[0]] = message;
                }
                throw errors;
            } else {
                return props.onValidate ? props.onValidate(v) : null;
            }
        },
        onSubmit: props.onSubmit,
    });

    const fields = { ...props.fields };
    Object.keys(state.values).forEach((name) => {
        fields[name].name = name;
        fields[name].state = state;
        fields[name].schema = props.schema;
    });

    return { fields, state };
}

export * as schema from 'zod';
