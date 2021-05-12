import React, { useState } from 'react';
import { useCreateQueueMutation } from '@/generated/queries';

import { useRouter } from '../../hooks/router';
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
    const [keyInfo, setKeyInfo] = useState('');
    const [keyValue, setKeyValue] = useState('');

    const onKeyChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.replace(/[^a-zA-Z ]/g, '').toUpperCase();
        value !== '' ? setKeyInfo(`Your issues in queue will look like: ${value}-1, ${value}-431.`) : setKeyInfo('');
        setKeyValue(value.toUpperCase());
    };

    const queueSchema = schema.object({
        key: schema.string(),
        description: schema.string().optional(),
    });

    type Q = schema.infer<typeof queueSchema>;

    const form = useFormState({
        fields: {
            key: {
                type: 'input',
                label: 'Queue key',
                placeholder: 'FRNTND',
                info: keyInfo,
                value: keyValue,
                onChange: onKeyChange,
            },
            description: {
                type: 'textarea',
                label: 'Description',
            },
        },
        schema: queueSchema,
        async onSubmit(queue: Q) {
            const { data } = await createQueueMutation({
                variables: { queue },
            });

            // TODO: https://github.com/productivity-tools/taskany/issues/90
            if (data) router.queue(data.createQueue.key);
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
