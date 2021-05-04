import React from 'react';
import styled, { css } from 'styled-components';
import {
    unstable_FormState,
    unstable_useFormState,
    unstable_FormInitialState,
    unstable_Form,
    unstable_FormLabel,
} from 'reakit/Form';

import { is } from '../../utils/styles';
import { Input } from '../../components/Input/Input';
import { textColorDanger, textColorSecondary } from '../../@generated/tokens';

interface FormFieldProps {
    type: keyof typeof supportedFormFieldControls;
    label: string;
    state?: unstable_FormState<any>;
    name?: string;
    required?: boolean;
    value?: any;
    placeholder?: string;
    info?: string;
}

export interface FormProps {
    fields: Record<string, FormFieldProps>;
    state: unstable_FormState<any>;
}

type FieldsMap = Record<string, FormFieldProps>;
interface FormStateProps<F extends FieldsMap> {
    fields: F;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onValidate?: (values: Record<keyof F, unknown>) => ReturnType<unstable_FormInitialState<any>['onValidate']>;
    onSubmit?: (values: Record<keyof F, unknown>) => void;
}

export type FormErrors<F> = Partial<Record<keyof F, string>>;

const StyledLabel = styled(unstable_FormLabel)<{ required?: boolean; error?: boolean }>`
    display: block;
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
    color: ${textColorSecondary};
`;

const StyledFormField = styled.div`
    padding: 15px 0;
`;

const StyledForm = styled(unstable_Form)`
    max-width: 440px;
`;

const StyledFormActions = styled.div`
    padding-top: 20px;
`;

const supportedFormFieldControls = {
    input: Input,
};

const FormField: React.FC<FormFieldProps> = ({ name, required, label, placeholder, info, type, state }) => {
    const Control = supportedFormFieldControls[type];
    const invalid = Boolean(state.errors[name]) || undefined;
    const infoMessage = state.errors[name] || info;

    return (
        <StyledFormField>
            <StyledLabel {...state} required={required} error={invalid}>
                {label}
            </StyledLabel>
            <Control {...state} name={name} placeholder={placeholder} error={invalid} />
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
        values,
        validateOnBlur: props.validateOnBlur,
        validateOnChange: props.validateOnChange,
        onValidate: props.onValidate,
        onSubmit: props.onSubmit,
    });

    const fields = { ...props.fields };
    Object.keys(state.values).forEach((name) => {
        fields[name].name = name;
        fields[name].state = state;
    });

    return { fields, state };
}
