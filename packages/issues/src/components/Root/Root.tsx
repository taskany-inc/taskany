import React from 'react';
import { useSession } from 'next-auth/client';

import { Header } from '../../components/Header/Header';
import { Main } from '../../components/Main/Main';
import { H1 } from '../../components/Typo/Typo';

export const Root: React.FC = ({ children }) => {
    const [session] = useSession();

    const page = session ? children : <H1>Access denied</H1>;

    return (
        <>
            <Header />

            <Main>{page}</Main>
        </>
    );
};
