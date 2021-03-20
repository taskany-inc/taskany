import { useEffect } from 'react';
import { useSession, getSession } from 'next-auth/client';

import { DialogPage } from '../../components/DialogPage/DialogPage';

// import { useQuery } from '../@generated/queries';

export default function Page() {
    const [session, loading] = useSession();
    // const { data } = useQuery();

    useEffect(() => {}, [session]);

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null;

    // If no session exists, display access denied message
    if (!session) {
        return <h1>Access denied</h1>;
    }

    return (
        <DialogPage
            header={
                <>
                    <div>Tell us about your queue</div>
                    <h1>Setup your new queue</h1>
                </>
            }
            content={'form'}
        />
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}
