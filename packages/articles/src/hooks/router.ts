import { useRouter as NextRouter } from 'next/router';

export const routes = {
    index: () => '/',
    createOrganization: () => '/organizations/new',
    organization: (id: string) => `/organizations/${id}`,
    article: (id: string) => `/articles/${id}`,
    createArticle: () => '/articles/new',
};

export const useRouter = () => {
    const router = NextRouter();

    return {
        index: () => router.push(routes.index()),
        organization: (id: string) => router.push(routes.organization(id)),
        createOrganization: () => router.push(routes.createOrganization()),
        article: (id: string) => router.push(routes.article(id)),
        createArticle: () => router.push(routes.createArticle()),
    };
};
