import React from 'react';

import { Input } from '../Input/Input';

type TextAreaProps = React.ComponentProps<typeof Input>;

export const TextArea: React.FC<TextAreaProps> = (values, ...props) => (
    <Input as="textarea" style={{ minHeight: '100px' }} {...props} />
);
