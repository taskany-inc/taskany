import React from 'react';
import { useSession } from 'next-auth/client';
import { H1 } from '@taskany/core/components';

import { Header } from '../../components/Header/Header';
import { Main } from '../../components/Main/Main';

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
