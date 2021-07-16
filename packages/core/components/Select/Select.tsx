import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';
import {
    FieldPath,
    FieldValues,
    FormState,
    UseFormRegister,
    RegisterOptions,
    Controller,
    Control,
} from 'react-hook-form';

import { Icon } from '../Icon/Icon';
import { inputBoxStyles } from '../InputBox/InputBox';
import {
    inputBackgroundColorFocus,
    inputBorderColor,
    inputBorderColorFocus,
    inputBoxShadowColorFocus,
    buttonPrimaryTextColor,
} from '../../tokens';
import { is } from '../../utils/styles';

type SelectProps = React.ComponentProps<typeof ReactSelect> & {
    brick?: 'left' | 'right' | 'center';
    name: string;
};

const StyledReactSelect = styled(ReactSelect)`
    min-width: 150px;

    ${is(
        { brick: 'right' },
        css`
            margin-right: -1px;
        `,
    )}

    ${is(
        { brick: 'center' },
        css`
            margin-right: -1px;
        `,
    )}

    .react-select__control {
        ${inputBoxStyles}

        padding: 0;

        min-height: initial;

        &:hover {
            border-color: ${inputBorderColor};
        }

        &--is-focused {
            z-index: 1;

            border-color: ${inputBorderColorFocus};
            box-shadow: 0 0 0 3px ${inputBoxShadowColorFocus};
            background-color: ${inputBackgroundColorFocus};

            &:hover {
                border-color: ${inputBorderColorFocus};
            }
        }
    }

    .react-select__value-container {
        padding: 1px 12px;
    }

    .react-select__indicator {
        padding: 0;
    }

    .react-select__placeholder,
    .react-select__single-value {
        margin: 0;

        font-size: 14px;
        line-height: 20px;
    }

    .react-select__single-value {
        color: inherit;
    }

    .react-select__menu {
        margin: 0;

        overflow: hidden;

        border-radius: 6px;

        box-shadow: 0 4px 11px hsl(0deg 0% 0% / 10%);
        border: 1px solid ${inputBorderColor};
    }

    .react-select__menu-list {
        padding: 0;
    }

    .react-select__option {
        padding: 5px 12px;

        font-size: 14px;
        line-height: 20px;

        &--is-focused {
            background-color: ${inputBoxShadowColorFocus};
        }

        &--is-selected {
            background-color: ${inputBorderColorFocus};
            color: ${buttonPrimaryTextColor};
        }

        &:active {
            background-color: ${inputBorderColorFocus};
            color: ${buttonPrimaryTextColor};
        }
    }
`;

const StyledDownIndicator = styled((props) => <Icon type="arrowDownSmall" size="s" {...props} />)`
    padding: 2px 4px 0;

    ${is(
        {
            focused: true,
        },
        css`
            transform: rotateX(180deg);
        `,
    )}
`;

const DownIndicator: React.FC<{ isFocused: boolean }> = ({ isFocused }) => <StyledDownIndicator focused={isFocused} />;

export const Select = React.forwardRef<SelectProps, SelectProps>((props, ref) => {
    const [selectValue, setSelectValue] = useState<Record<string, { label: string; value: string }>>({});

    const onSelectValueChange = (v: { label: string; value: string }, proxyChange?: (pv: string) => void) => {
        setSelectValue({
            ...selectValue,
            [v.value]: v,
        });

        if (proxyChange) proxyChange(v.value);
    };

    return (
        <Controller
            control={props.control}
            name={props.name}
            render={({ field: { onChange, onBlur, value } }) => (
                <StyledReactSelect
                    {...props}
                    onChange={(v: { label: string; value: string }) => onSelectValueChange(v, onChange)}
                    onBlur={onBlur}
                    value={selectValue[value]}
                    innerRef={ref}
                    instanceId={props.instanceId}
                    classNamePrefix="react-select"
                    components={{ DropdownIndicator: DownIndicator, IndicatorSeparator: () => null }}
                />
            )}
        />
    );
});

export const createFormSelectProps = (
    name: string,
    {
        register,
        control,
        formState,
    }: { register: UseFormRegister<FieldValues>; control: Control; formState: FormState<FieldValues> },
    inputProps?: Omit<SelectProps, 'name'>,
) => (options?: RegisterOptions<FieldValues, FieldPath<FieldValues>>) => ({
    ...inputProps,
    ...register(name, options),
    instanceId: name,
    control,
    error: Boolean(formState.errors[name]),
});
