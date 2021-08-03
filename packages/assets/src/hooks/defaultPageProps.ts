import { getSession } from 'next-auth/client';

export const defaultPageProps = async (context) => ({
    props: {
        session: await getSession(context),
    },
});
