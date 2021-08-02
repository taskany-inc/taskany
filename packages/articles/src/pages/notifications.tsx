import { useEffect } from 'react';
import { useSession } from 'next-auth/client';

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

    return <h1>Notifications</h1>;
}
