import { textColorPrimary, textColorTertiary } from '@/generated/tokens';
import styled from 'styled-components';

export const H1 = styled.h1`
    margin: 0;

    font-weight: 600;
    font-size: 32px;

    color: ${textColorPrimary};
`;

export const H2 = styled.h2`
    margin: 0;

    font-weight: 600;
    font-size: 24px;

    color: ${textColorPrimary};
`;

export const H3 = styled.h3`
    margin: 0;

    font-weight: 600;
    font-size: 20px;

    color: ${textColorPrimary};
`;

export const H4 = styled.h4`
    margin: 0;

    font-weight: 600;
    font-size: 16px;

    color: ${textColorPrimary};
`;

export const Hi = styled.div`
    font-size: 14px;
    color: ${textColorTertiary};

    padding-bottom: 5px;
`;
