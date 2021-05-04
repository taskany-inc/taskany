import { useEffect } from 'react';
import { useSession, getSession } from 'next-auth/client';

import { DialogPage } from '../../components/DialogPage/DialogPage';
import { Form, useFormState } from '../../components/Form/Form';
import { ButtonSubmit } from '../../components/Button/_submit/Button_submit';

// import { useQuery } from '../@generated/queries';

const PageHeader: React.FC = () => (
    <>
        <div>Tell us about your queue</div>
        <h1>Setup your new queue</h1>
    </>
);

const PageContent: React.FC = () => {
    const state = useFormState({
        fields: {
            name: {
                type: 'input',
                required: true,
                label: 'Queue name',
                placeholder: 'ololol',
            },
            description: {
                type: 'input',
                label: 'Description',
            },
        },
        onValidate(fields) {
            const errors: Partial<Record<keyof typeof fields, string>> = {};
            if (fields.name !== 'ccc') {
                errors.name = 'Error!';
                throw errors;
            }
        },
        onSubmit(fields) {
            console.log('submit!', fields);
        },
    });

    return (
        <>
            <Form {...state}>
                <ButtonSubmit {...state} text="Create" view="primary" />
            </Form>
        </>
    );
};

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

    return <DialogPage title="Create new queue" header={<PageHeader />} content={<PageContent />} />;
}

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}
