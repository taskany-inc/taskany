import React, { useEffect } from 'react';

import { GlobalStyle } from '../../GlobalStyle/GlobalStyle';
import { textFontUrl } from '../../../tokens';
import dark from '../../../tokens/dark';
import light from '../../../tokens/light';

const themes = {
    dark,
    light,
};

const loadFonts = () => {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';

    head.appendChild(link);

    link.href = textFontUrl;
};

export const ThemeStorybook: React.FC<{ theme: keyof typeof themes }> = ({ theme }) => {
    const ThemeComponent = themes[theme];

    useEffect(() => loadFonts());

    return (
        <>
            <GlobalStyle />
            <ThemeComponent />
        </>
    );
};
