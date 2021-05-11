import { useRouter as NextRouter } from 'next/router';

export const useRouter = () => {
    const router = NextRouter();

    return {
        index: () => router.push('/'),
        queue: (id: string) => router.push(`/queues/${id}`),
        issues: (id: string) => router.push(`/issues/${id}`),
    };
};
