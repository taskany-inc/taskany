import React from 'react';
import { useSession } from 'next-auth/client';
import { useCreateIssueMutation, useAllQueuesQuery } from '@/generated/queries';

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
import { Select, createFormSelectProps } from '../../components/Select/Select';
import { MarkdownEditor, createFormMarkdownEditorProps } from '../../components/MarkdownEditor/MarkdownEditor';
import { Button } from '../../components/Button/Button';
import { TimelineComment } from '../../components/TimelineComment/TimelineComment';
import { defaultPageProps } from '../../hooks/defaultPageProps';
import { useHotkey } from '../../hooks/useHotkeys';

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

    const { register, handleSubmit, formState, control } = useFormState({ schema: issueSchema, mode: 'onBlur' });
    const queueSelectProps = createFormSelectProps(
        'queue',
        { register, control, formState },
        { placeholder: 'Queue' },
    )();
    const titleInputProps = createFormInputProps('title', { register, formState }, { placeholder: 'Title' })();
    const descriptionInputProps = createFormMarkdownEditorProps('description', { register, formState })();

    const onSubmit = async (issue: I) => {
        const { data } = await createIssueMutation({
            variables: {
                issue,
            },
        });
        // TODO: https://github.com/productivity-tools/taskany/issues/90
        if (data) router.issue(data.createIssue.key);
    };

    useHotkey('$mod+Enter', handleSubmit(onSubmit));

    // TODO: use async select https://react-select.com/async
    const { data: queues, loading: queuesAreLoading } = useAllQueuesQuery();

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
                                <Select
                                    brick="right"
                                    options={
                                        queuesAreLoading
                                            ? []
                                            : queues?.allQueues?.map((q) => ({
                                                  label: `${q.key} — ${q.title}`,
                                                  value: q.key,
                                              }))
                                    }
                                    {...queueSelectProps}
                                />

                                <Input brick="left" {...titleInputProps} />
                            </FormField>

                            <FormField type="markdown">
                                <MarkdownEditor {...descriptionInputProps} />
                            </FormField>

                            <FormActions>
                                <Button text="Create issue" view="primary" type="submit" />
                            </FormActions>
                        </Form>
                    </TimelineComment>
                )}
            </DialogPageContent>
        </DialogPage>
    );
}
