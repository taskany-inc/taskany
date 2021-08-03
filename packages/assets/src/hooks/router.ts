import { useRouter as NextRouter } from 'next/router';

export const routes = {
    index: () => '/',
    asset: (id: string) => `/assets/${id}`,
    createAsset: () => '/assets/new',
};

export const useRouter = () => {
    const router = NextRouter();

    return {
        index: () => router.push(routes.index()),
        asset: (id: string) => router.push(routes.asset(id)),
        createAsset: () => router.push(routes.createAsset()),
    };
};
