import React from 'react';
import { Story, Meta } from '@storybook/react';

import { decorators } from '../../utils/storyDecorators';
import { useFormState, schema } from '../Form/Form';

import { Input, createFormInputProps } from './Input';

export default {
    title: 'Example/Input',
    component: Input,
    decorators,
} as Meta;

const Template: Story<React.ComponentProps<typeof Input>> = (args) => {
    const exampleSchema = schema.object({
        example: schema.string().min(1),
    });
    type V = schema.infer<typeof exampleSchema>;

    const { register, handleSubmit, formState } = useFormState({ schema: exampleSchema, mode: 'onBlur' });
    const inputProps = createFormInputProps('example', { register, formState });

    const onSubmit = (values: V) => {
        alert(JSON.stringify(values));
    };

    return (
        <form style={{ width: '300px' }} onSubmit={handleSubmit(onSubmit)}>
            <Input {...args} {...inputProps()} />
            <input type="submit" />
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {
    defaultValue: 'any text',
};
