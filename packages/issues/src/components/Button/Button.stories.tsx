import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Theme } from '../Theme/Theme';

import { Button } from './Button';

export default {
    title: 'Example/Button',
    component: Button,
} as Meta;

const Template: Story<React.ComponentProps<typeof Button>> = (args) => (
    <>
        <Theme theme="dark" />
        <Button {...args} />
    </>
);

export const Default = Template.bind({});
Default.args = {
    text: 'Button',
};

export const Primary = Template.bind({});
Primary.args = {
    text: 'Button',
    view: 'primary',
};

export const Disabled = Template.bind({});
Disabled.args = {
    text: 'Button',
    view: 'primary',
    disabled: true,
};
