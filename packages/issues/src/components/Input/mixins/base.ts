import { css } from 'styled-components';

import {
    inputTextColor,
    inputBackgroundColor,
    inputBackgroundColorFocus,
    inputBorderColor,
    textFontFamily,
    inputBorderColorFocus,
    inputBoxShadowColor,
    inputBoxShadowColorFocus,
    inputPlaceholderColor,
    inputBoxShadowErrorColorFocus,
    textColorDanger,
} from '../../../@generated/tokens';
import { is } from '../../../utils/styles';

export const base = css`
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

    &:focus {
        border-color: ${inputBorderColorFocus};
        box-shadow: 0 0 0 3px ${inputBoxShadowColorFocus};
        background-color: ${inputBackgroundColorFocus};
    }

    &::placeholder {
        color: ${inputPlaceholderColor};
        font-family: ${textFontFamily};
    }

    ${is(
        { error: true },
        css`
            border-color: ${textColorDanger} !important;
            box-shadow: 0 0 0 3px ${inputBoxShadowErrorColorFocus} !important;
        `,
    )}
`;
