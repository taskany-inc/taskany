export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            icon: 'circlehollow',
            items: ['light', 'dark'],
        },
    },
};
