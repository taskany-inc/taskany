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
import { Form, useFormState, schema } from '../../components/Form/Form';
import { ButtonSubmit } from '../../components/Button/_submit/Button_submit';
import { TimelineComment } from '../../components/TimelineComment/TimelineComment';
import { defaultPageProps } from '../../hooks/defaultPageProps';

export const getServerSideProps = defaultPageProps;
export default function Page() {
    const [session] = useSession();
    const router = useRouter();
    const [createIssueMutation] = useCreateIssueMutation();

    const issueSchema = schema.object({
        queue: schema.string(),
        title: schema.string(),
        description: schema.string().optional(),
    });

    type I = schema.infer<typeof issueSchema>;

    const form = useFormState({
        fields: {
            queue: {
                type: 'input',
                placeholder: 'Queue',
            },
            title: {
                type: 'input',
                placeholder: 'Title',
            },
            description: {
                type: 'markdown',
            },
        },
        schema: issueSchema,
        async onSubmit(issue: I) {
            const { data } = await createIssueMutation({
                variables: { issue },
            });
            // TODO: https://github.com/productivity-tools/taskany/issues/90
            if (data) router.issue(data.createIssue.key);
        },
    });

    return (
        <DialogPage>
            <DialogPageTitle>Create new issue</DialogPageTitle>

            <DialogPageHeader>
                <H1>Create new issue</H1>
            </DialogPageHeader>

            <DialogPageContent>
                {session?.user?.image && (
                    <TimelineComment image={session.user.image}>
                        <Form {...form}>
                            <ButtonSubmit {...form} text="Create issue" view="primary" />
                        </Form>
                    </TimelineComment>
                )}
            </DialogPageContent>
        </DialogPage>
    );
}
