import React from 'react';

import { Input } from '../Input/Input';

type TextAreaProps = React.ComponentProps<typeof Input>;

// FIXME: doesn't set value to form state https://github.com/reakit/reakit/discussions/869
export const TextArea: React.FC<TextAreaProps> = (props) => (
    <Input {...props} style={{ minHeight: '100px' }} forwardAs="textarea" />
);
