import React from 'react';
import { Story, Meta } from '@storybook/react';

import { decorators } from '../../utils/storyDecorators';

import { MarkdownEditor } from './MarkdownEditor';

export default {
    title: 'Example/MarkdownEditor',
    component: MarkdownEditor,
    decorators,
} as Meta;

const Template: Story<React.ComponentProps<typeof MarkdownEditor>> = (args) => <MarkdownEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
    value: `__wow__ it works

_test_ rows

and [link](ya.ru)`,
};
