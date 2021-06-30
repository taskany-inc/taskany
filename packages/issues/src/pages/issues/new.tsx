import React from 'react';
import { useSession } from 'next-auth/client';
import { useCreateIssueMutation } from '@/generated/queries';

import { useRouter } from '../../hooks/router';
import { H1 } from '../../components/Typo/Typo';
import {
    DialogPage,
    DialogPageTitle,
    DialogPageHeader,
    DialogPageContent,
} from '../../components/DialogPage/DialogPage';
import { Form, FormField, FormActions, useFormState, schema } from '../../components/Form/Form';
import { Input, createFormInputProps } from '../../components/Input/Input';
import { MarkdownEditor, createFormMarkdownEditorProps } from '../../components/MarkdownEditor/MarkdownEditor';
import { ButtonSubmit } from '../../components/Button/_submit/Button_submit';
import { TimelineComment } from '../../components/TimelineComment/TimelineComment';
import { defaultPageProps } from '../../hooks/defaultPageProps';

export const getServerSideProps = defaultPageProps;
export default function Page() {
    const [session] = useSession();
    const router = useRouter();
    const [createIssueMutation] = useCreateIssueMutation();

    const issueSchema = schema.object({
        queue: schema.string().min(1),
        title: schema.string().min(1),
        description: schema.string().optional(),
    });
    type I = schema.infer<typeof issueSchema>;

    const { register, handleSubmit, formState } = useFormState({ schema: issueSchema, mode: 'onBlur' });
    const queueInputProps = createFormInputProps('queue', { register, formState }, { placeholder: 'Queue' })();
    const titleInputProps = createFormInputProps('title', { register, formState }, { placeholder: 'Title' })();
    const descriptionInputProps = createFormMarkdownEditorProps('description', { register, formState })();

    const onSubmit = async (issue: I) => {
        const { data } = await createIssueMutation({
            variables: { issue },
        });
        // TODO: https://github.com/productivity-tools/taskany/issues/90
        if (data) router.issue(data.createIssue.key);
    };

    return (
        <DialogPage>
            <DialogPageTitle>Create new issue</DialogPageTitle>

            <DialogPageHeader>
                <H1>Create new issue</H1>
            </DialogPageHeader>

            <DialogPageContent>
                {session?.user?.image && (
                    <TimelineComment image={session.user.image}>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormField type="complex">
                                {/* select + */}
                                <Input {...queueInputProps} />
                            </FormField>

                            <FormField type="complex">
                                {/* select + */}
                                <Input {...titleInputProps} />
                            </FormField>

                            <FormField type="markdown">
                                <MarkdownEditor {...descriptionInputProps} />
                            </FormField>

                            <FormActions>
                                <ButtonSubmit text="Create issue" view="primary" />
                            </FormActions>
                        </Form>
                    </TimelineComment>
                )}
            </DialogPageContent>
        </DialogPage>
    );
}
