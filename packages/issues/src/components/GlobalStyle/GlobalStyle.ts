import { createGlobalStyle } from 'styled-components';

import { textFontFamily } from '../../@generated/tokens';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${textFontFamily};
    }
`;
