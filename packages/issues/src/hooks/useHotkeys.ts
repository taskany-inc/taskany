import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import tinykeys from 'tinykeys';

export const useHotkeys = () => {
    const router = useRouter();

    useLayoutEffect(() => {
        const unsubscribe = tinykeys(window, {
            'c q': () => {
                console.log('redirecting to new queque via hotkey');
                router.push('/queues/new');
            },
        });
        return () => {
            unsubscribe();
        };
    });
};
