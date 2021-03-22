import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { textFontUrl } from '../../@tokens';

const themes = {
    dark: dynamic(() => import('../../@tokens/dark')),
};

const theme: keyof typeof themes = 'dark';

export const Theme: React.FC = () => {
    const ThemeComponent = themes[theme];

    return (
        <>
            <Head>
                <link rel="stylesheet" href={textFontUrl} />
            </Head>
            <ThemeComponent />
        </>
    );
};
