import React from 'react';
import { useRouter } from 'next/router';
import { useCreateQueueMutation } from '@/generated/queries';

import { H1, Hi } from '../../components/Typo/Typo';
import {
    DialogPage,
    DialogPageTitle,
    DialogPageHeader,
    DialogPageContent,
} from '../../components/DialogPage/DialogPage';
import { Form, useFormState, schema } from '../../components/Form/Form';
import { ButtonSubmit } from '../../components/Button/_submit/Button_submit';
import { defaultPageProps } from '../../hooks/defaultPageProps';

export const getServerSideProps = defaultPageProps;
export default function Page() {
    const router = useRouter();
    const [createQueueMutation] = useCreateQueueMutation();

    const queueSchema = schema.object({
        key: schema.string(),
        description: schema.string().optional(),
    });

    // FIXME: all optional fields is not expected result. https://github.com/colinhacks/zod/discussions/426
    type Q = schema.infer<typeof queueSchema>;

    const form = useFormState({
        fields: {
            key: {
                type: 'input',
                label: 'Queue key',
                placeholder: 'ololol',
            },
            description: {
                type: 'textarea',
                label: 'Description',
            },
        },
        schema: queueSchema,
        async onSubmit(queue: Required<Q>) {
            const { data } = await createQueueMutation({
                variables: { queue },
            });

            router.push(`/queues/${data.createQueue.key}`);
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
                <Form {...form}>
                    <ButtonSubmit {...form} text="Create" view="primary" />
                </Form>
            </DialogPageContent>
        </DialogPage>
    );
}
