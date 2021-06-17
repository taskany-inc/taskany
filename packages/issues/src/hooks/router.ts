import { useRouter as NextRouter } from 'next/router';

export const routes = {
    index: () => '/',
    createQueue: () => '/queues/new',
    queue: (id: string) => `/queues/${id}`,
    queueBoards: (id: string) => `/queues/${id}/boards`,
    queueInsights: (id: string) => `/queues/${id}/insights`,
    queueSettigns: (id: string) => `/queues/${id}/settings`,
    issue: (id: string) => `/issues/${id}`,
    createIssue: () => '/issues/new',
};

export const useRouter = () => {
    const router = NextRouter();

    return {
        index: () => router.push(routes.index()),
        queue: (id: string) => router.push(routes.queue(id)),
        createQueue: () => router.push(routes.createQueue()),
        issue: (id: string) => router.push(routes.issue(id)),
        createIssue: () => router.push(routes.createIssue()),
    };
};
