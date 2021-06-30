import React from 'react';
import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';
import { FieldPath, FieldValues, FormState, UseFormRegister, RegisterOptions } from 'react-hook-form';

import { Icon } from '../Icon/Icon';
import { inputBoxStyles } from '../InputBox/InputBox';
import {
    inputBackgroundColorFocus,
    inputBorderColor,
    inputBorderColorFocus,
    inputBoxShadowColorFocus,
    buttonPrimaryTextColor,
} from '../../@generated/tokens';
import { is } from '../../utils/styles';

type SelectProps = React.ComponentProps<typeof ReactSelect> & {
    brick?: 'left' | 'right' | 'center';
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

const DownIndicator = ({ isFocused }) => <StyledDownIndicator focused={isFocused} />;

export const Select = React.forwardRef<SelectProps, SelectProps>((props, ref) => (
    <StyledReactSelect
        {...props}
        innerRef={ref}
        classNamePrefix="react-select"
        components={{ DropdownIndicator: DownIndicator, IndicatorSeparator: () => null }}
    />
));

export const createFormSelectProps = (
    name: string,
    { register, formState }: { register: UseFormRegister<FieldValues>; formState: FormState<FieldValues> },
    inputProps?: SelectProps,
) => (options?: RegisterOptions<FieldValues, FieldPath<FieldValues>>) => ({
    ...inputProps,
    ...register(name, options),
    instanceId: name,
    error: Boolean(formState.errors[name]),
});
