import { ThemeStorybook } from '../components/Theme/_storybook/Theme_storybook';

export const decorators = [
    (Story, context) => (
        <>
            <ThemeStorybook theme={context.globals.theme} />
            <Story />
        </>
    ),
];
