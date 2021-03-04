import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';

import { useQuery } from '../@generated/queries';
import Header from '../components/Header/Header';

export default function Page() {
    const [session, loading] = useSession();
    const [content, setContent] = useState();
    const { data } = useQuery();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/protected');
            const json = await res.json();
            if (json.content) {
                setContent(json.content);
            }
        };
        fetchData();
    }, [session]);

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null;

    // If no session exists, display access denied message
    if (!session) {
        return (
            <>
                <Header />
                <h1>Access denied</h1>
            </>
        );
    }

    return (
        <>
            <Header />
            <h1>Protected Page</h1>
            <p>
                <strong>{content || '\u00a0'}</strong>
            </p>
            <p>{JSON.stringify(data)}</p>
        </>
    );
}
