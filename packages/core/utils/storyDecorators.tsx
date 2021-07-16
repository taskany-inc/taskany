import { ThemeStorybook } from '../components/Theme/_storybook/Theme_storybook';

export const decorators = [
    (Story: any, context: any) => (
        <>
            <ThemeStorybook theme={context.globals.theme} />
            <Story />
        </>
    ),
];
