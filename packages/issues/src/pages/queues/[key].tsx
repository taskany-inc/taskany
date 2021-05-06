import React from 'react';
import { useRouter } from 'next/router';
import {} from '@/generated/queries';

import { H1 } from '../../components/Typo/Typo';
import { defaultPageProps } from '../../hooks/defaultPageProps';

export const getServerSideProps = defaultPageProps;
export default function Page() {
    const router = useRouter();
    const { key } = router.query;

    return <H1>Queue: {key}</H1>;
}
