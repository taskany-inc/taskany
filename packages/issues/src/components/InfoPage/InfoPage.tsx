import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

const StyledInfoPage = styled.div``;
const StyledInfoPageHeader = styled.div`
    padding: 32px 36px 0;
    background-color: #fafbfc;
    box-shadow: inset 0 -1px 0 #eaecef;
`;
const StyledInfoPageContent = styled.div`
    padding: 0 32px;
`;
const StyledInfoPageFooter = styled.div`
    padding: 0 32px;
`;
const StyledInfoHeaderTitle = styled.div`
    padding-bottom: 20px;
`;

export const InfoPage: React.FC = ({ children }) => <StyledInfoPage>{children}</StyledInfoPage>;

export const InfoPageTitle: React.FC<{ children?: string | null }> = ({ children }) => (
    <Head>
        <title>{children}</title>
    </Head>
);
export const InfoPageHeader = StyledInfoPageHeader;
export const InfoPageHeaderTitle = StyledInfoHeaderTitle;
export const InfoPageContent = StyledInfoPageContent;
export const InfoPageFooter = StyledInfoPageFooter;
