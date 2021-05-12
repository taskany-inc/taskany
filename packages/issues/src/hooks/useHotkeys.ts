import { useEffect } from 'react';
import tinykeys from 'tinykeys';

import { useRouter } from './router';

export const useHotkeys = () => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = tinykeys(window, {
            'c q': () => router.createQueue(),
            'c i': () => router.createIssue(),
        });
        return () => {
            unsubscribe();
        };
    });
};
