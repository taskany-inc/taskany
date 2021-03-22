import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { textFontUrl } from '../../@generated/tokens';

const themes = {
    dark: dynamic(() => import('../../@generated/tokens/dark')),
};

export const Theme: React.FC<{ theme: keyof typeof themes }> = ({ theme }) => {
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
