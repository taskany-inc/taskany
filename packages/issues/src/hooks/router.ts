import { useRouter as NextRouter } from 'next/router';

export const useRouter = () => {
    const router = NextRouter();

    return {
        index: () => router.push('/'),
        queue: (id: string) => router.push(`/queues/${id}`),
        createQueue: () => router.push('/queues/new'),
        issue: (id: string) => router.push(`/issues/${id}`),
        createIssue: () => router.push('/issues/new'),
    };
};
