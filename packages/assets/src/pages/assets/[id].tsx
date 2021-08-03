import React from 'react';
import { useRouter } from 'next/router';
import {} from '@/generated/queries';
import { H1 } from '@taskany/core/components';

import { defaultPageProps } from '../../hooks/defaultPageProps';

export const getServerSideProps = defaultPageProps;
export default function Page() {
    const router = useRouter();
    const { id } = router.query;

    return <H1>Post: {id}</H1>;
}
