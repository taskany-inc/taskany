import { useEffect } from 'react';
import { useSession, getSession } from 'next-auth/client';
import * as zod from 'zod';

import { H1, Hi } from '../../components/Typo/Typo';
import {
    DialogPage,
    DialogPageTitle,
    DialogPageHeader,
    DialogPageContent,
} from '../../components/DialogPage/DialogPage';
import { Form, useFormState, schema } from '../../components/Form/Form';
import { ButtonSubmit } from '../../components/Button/_submit/Button_submit';

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

    const state = useFormState({
        fields: {
            name: {
                type: 'input',
                label: 'Queue name',
                placeholder: 'ololol',
                schema: schema.string().length(3, { message: 'WOW!' }),
            },
            description: {
                type: 'textarea',
                label: 'Description',
                schema: schema.string().optional(),
            },
        },
        onSubmit(fields) {
            console.log('submit!', fields);
        },
    });

    return (
        <DialogPage>
            <DialogPageTitle>Create new queue</DialogPageTitle>
            <DialogPageHeader>
                <Hi>Tell us about your queue</Hi>
                <H1>Setup your new queue</H1>
            </DialogPageHeader>
            <DialogPageContent>
                <Form {...state}>
                    <ButtonSubmit {...state} text="Create" view="primary" />
                </Form>
            </DialogPageContent>
        </DialogPage>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}
