import React from 'react';
import styled from 'styled-components';
import { unstable_FormInput as ReakitInput } from 'reakit/Form';

import { base } from './mixins/base';

type InputProps = React.ComponentProps<typeof ReakitInput> & {
    error?: boolean;
};

const StyledInput = styled(({ error, forwardAs, ...props }) => <ReakitInput as={forwardAs} {...props} />)<InputProps>`
    ${base}
`;

export const Input: React.FC<InputProps> = (props) => <StyledInput {...props} />;
