import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import { useCreateQueueMutation } from '@/generated/queries';

import { useRouter } from '../../hooks/router';
import { H1, Hi } from '../../components/Typo/Typo';
import {
    DialogPage,
    DialogPageTitle,
    DialogPageHeader,
    DialogPageContent,
} from '../../components/DialogPage/DialogPage';
import { Form, FormField, FormActions, useFormState, schema } from '../../components/Form/Form';
import { Input, createFormInputProps } from '../../components/Input/Input';
import { TextArea, createFormTextAreaProps } from '../../components/TextArea/TextArea';
import { ButtonSubmit } from '../../components/Button/_submit/Button_submit';
import { TimelineComment } from '../../components/TimelineComment/TimelineComment';
import { defaultPageProps } from '../../hooks/defaultPageProps';

const keyInfoMessage = (value: string) => `Your issues in queue will look like: ${value}-1, ${value}-431.`;

export const getServerSideProps = defaultPageProps;
export default function Page() {
    const exKey = 'FRNTND';
    const exInfo = keyInfoMessage(exKey);
    const [session] = useSession();
    const router = useRouter();
    const [createQueueMutation] = useCreateQueueMutation();
    const [keyInfo, setKeyInfo] = useState(exInfo);
    const [keyValue, setKeyValue] = useState('');

    const queueSchema = schema.object({
        key: schema.string().min(1),
        title: schema.string().min(1),
        description: schema.string().optional(),
    });
    type Q = schema.infer<typeof queueSchema>;

    const { register, handleSubmit, formState } = useFormState({ schema: queueSchema, mode: 'onBlur' });
    const keyInputProps = createFormInputProps(
        'key',
        { register, formState },
        { placeholder: exKey, value: keyValue },
    )();
    const titleInputProps = createFormInputProps('title', { register, formState }, { placeholder: 'Title' })();
    const descriptionTextAreaProps = createFormTextAreaProps(
        'description',
        { register, formState },
        { placeholder: 'Description' },
    )();

    const onKeyChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.replace(/[^a-zA-Z ]/g, '').toUpperCase();
        value !== '' ? setKeyInfo(keyInfoMessage(value)) : setKeyInfo(exInfo);
        setKeyValue(value.toUpperCase());

        keyInputProps.onChange(e);
    };

    const onSubmit = async (queue: Q) => {
        const { data } = await createQueueMutation({
            variables: { queue },
        });

        // TODO: https://github.com/productivity-tools/taskany/issues/90
        if (data) router.queue(data.createQueue.key);
    };

    return (
        <DialogPage>
            <DialogPageTitle>Create new queue</DialogPageTitle>
            <DialogPageHeader>
                <Hi>Tell us about your queue</Hi>
                <H1>Setup your new queue</H1>
            </DialogPageHeader>
            <DialogPageContent>
                {session?.user?.image && (
                    <TimelineComment image={session.user.image}>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormField type="input" info={keyInfo}>
                                <Input {...keyInputProps} onChange={onKeyChange} />
                            </FormField>

                            <FormField type="input">
                                <Input {...titleInputProps} />
                            </FormField>

                            <FormField type="textarea">
                                <TextArea {...descriptionTextAreaProps} />
                            </FormField>

                            <FormActions>
                                <ButtonSubmit text="Create" view="primary" />
                            </FormActions>
                        </Form>
                    </TimelineComment>
                )}
            </DialogPageContent>
        </DialogPage>
    );
}
