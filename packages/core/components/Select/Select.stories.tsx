import React from 'react';
import { Story, Meta } from '@storybook/react';

import { decorators } from '../../utils/storyDecorators';
import { Input } from '../Input/Input';

import { Select } from './Select';

export default {
    title: 'Example/Select',
    component: Select,
    decorators,
} as Meta;

const Template: Story<React.ComponentProps<typeof Select>> = (args) => (
    <>
        <Select {...args} />
        <Input value="Text" />
    </>
);

export const Default = Template.bind({});
Default.args = {
    options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'text', label: 'Text' },
        { value: 'vanilla', label: 'Vanilla' },
    ],
};
