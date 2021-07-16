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
} from '../../tokens';
import { is } from '../../utils/styles';

export const inputBoxStyles = css`
    width: 100%;
    padding: 5px 12px;
    vertical-align: middle;

    font-family: ${textFontFamily};
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
        z-index: 1;

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
            z-index: 1;

            border-color: ${textColorDanger} !important;
            box-shadow: 0 0 0 3px ${inputBoxShadowErrorColorFocus} !important;
        `,
    )}

    ${is(
        { brick: 'left' },
        css`
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        `,
    )}

    ${is(
        { brick: 'right' },
        css`
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;

            margin-right: -1px;
        `,
    )}

    ${is(
        { brick: 'center' },
        css`
            border-radius: 0;

            margin-right: -1px;
        `,
    )}
`;
