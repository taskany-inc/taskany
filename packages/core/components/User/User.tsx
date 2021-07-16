import React from 'react';
import styled from 'styled-components';

interface UserProps {
    src: string;
    size?: number;
}

const StyledImage = styled.img`
    border: 0;
    border-radius: 100%;

    display: inline-block;
    vertical-align: middle;
`;

export const User: React.FC<UserProps> = ({ src, size = 24 }) => {
    const sizePx = `${size}px`;

    return <StyledImage src={src} height={sizePx} width={sizePx} />;
};
