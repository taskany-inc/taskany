import React from 'react';
import styled, { css } from 'styled-components';
import { unstable_FormInput as ReakitInput } from 'reakit/Form';
import {
    inputTextColor,
    inputBackgroundColor,
    inputBorderColor,
    textFontFamily,
    inputBorderColorFocus,
    inputBoxShadowColor,
    inputBoxShadowColorFocus,
    textColorDanger,
} from '@/generated/tokens';

import { is } from '../../utils/styles';


type InputProps = React.ComponentProps<typeof ReakitInput> & {
    error?: boolean;
};

const StyledInput = styled(ReakitInput)<InputProps>`
    width: 100%;
    padding: 5px 12px;
    vertical-align: middle;

    font-size: 14px;
    line-height: 20px;
    color: ${inputTextColor};

    background-color: ${inputBackgroundColor};
    border: 1px solid ${inputBorderColor};
    border-radius: 6px;
    box-shadow: 0 0 0 3px ${inputBoxShadowColor};

    outline: none;
    box-sizing: border-box;

    :focus {
        border-color: ${inputBorderColorFocus};
        box-shadow: 0 0 0 3px ${inputBoxShadowColorFocus};
    }

    ::placeholder {
        opacity: 0.2;
        color: ${inputTextColor};
        font-family: ${textFontFamily};
        font-size: 12px;
    }

    ${is(
        { error: true },
        css`
            border-color: ${textColorDanger} !important;
        `,
    )}
`;

export const Input: React.FC<InputProps> = (props) => <StyledInput {...props} />;
