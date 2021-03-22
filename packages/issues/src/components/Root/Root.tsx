import React from 'react';

import { Header } from '../../components/Header/Header';
import { Main } from '../../components/Main/Main';

export const Root: React.FC = ({ children }) => {
    return (
        <>
            <Header />

            <Main>{children}</Main>
        </>
    );
};
