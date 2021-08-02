import { useSession, getSession } from 'next-auth/client';
import Head from 'next/head';

export default function Home() {
    // As this page uses Server Side Rendering, the `session` will be already
    // populated on render without needing to go through a loading stage.
    // This is possible because of the shared context configured in `_app.js` that
    // is used by `useSession()`.
    const [session, loading] = useSession();

    return (
        <div>
            <Head>
                <title>Taskany Articles</title>
            </Head>
        </div>
    );
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}
