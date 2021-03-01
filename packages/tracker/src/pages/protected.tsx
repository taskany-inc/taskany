import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';

import Header from '../components/Header';

export default function Page() {
    const [session, loading] = useSession();
    const [content, setContent] = useState();

    // Fetch content from protected route
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

    // If session exists, display content
    return (
        <>
            <Header />
            <h1>Protected Page</h1>
            <p>
                <strong>{content || '\u00a0'}</strong>
            </p>
        </>
    );
}
