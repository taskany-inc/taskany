import { textColorPrimary, textColorTertiary } from '@/generated/tokens';
import styled from 'styled-components';

export const H1 = styled.h1`
    margin: 0;

    font-weight: 600;
    font-size: 32px;

    color: ${textColorPrimary};
`;

export const Hi = styled.div`
    font-size: 14px;
    color: ${textColorTertiary};

    padding-bottom: 5px;
`;
