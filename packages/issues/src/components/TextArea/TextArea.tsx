import React from 'react';

import { Input } from '../Input/Input';

type TextAreaProps = React.ComponentProps<typeof Input>;

export const TextArea: React.FC<TextAreaProps> = (props) => (
    <Input {...props} style={{ minHeight: '100px' }} forwardAs="textarea" />
);
