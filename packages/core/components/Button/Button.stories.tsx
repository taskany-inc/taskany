import React from 'react';
import { Story, Meta } from '@storybook/react';

import { decorators } from '../../utils/storyDecorators';

import { Button } from './Button';

export default {
    title: 'Example/Button',
    component: Button,
    decorators,
} as Meta;

const Template: Story<React.ComponentProps<typeof Button>> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    text: 'Button',
};
