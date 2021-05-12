import React from 'react';
import { Story, Meta } from '@storybook/react';

import { decorators } from '../../utils/storyDecorators';

import { Tabs, Tab, TabMenu, TabPanel } from './Tabs';

const TabsExample: React.FC = () => {
    return (
        <Tabs onChange={(id) => console.log('onChange', id)}>
            <TabMenu aria-label="My tabs">
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
                <Tab>Tab 3</Tab>
            </TabMenu>
            <TabPanel>Tab 1</TabPanel>
            <TabPanel>Tab 2</TabPanel>
            <TabPanel>Tab 3</TabPanel>
        </Tabs>
    );
};

export default {
    title: 'Example/Tabs',
    component: TabsExample,
    decorators,
} as Meta;

const Template: Story<React.ComponentProps<typeof Tabs>> = (args) => <TabsExample {...args} />;

export const Default = Template.bind({});
Default.args = {};
