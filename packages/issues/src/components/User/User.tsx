import React from 'react';
import styled from 'styled-components';

interface UserProps {
    src: string;
}

const StyledImage = styled.img`
    border: 0;
    border-radius: 100%;
`;

export const User: React.FC<UserProps> = ({ src }) => {
    return <StyledImage src={src} height="24px" width="24px" />;
};
