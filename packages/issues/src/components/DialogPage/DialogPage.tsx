import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

const StyledDialogPage = styled.div``;
const StyledDialogPageHeader = styled.div`
    padding: 32px;
    margin-bottom: 32px;
    background-color: #fafbfc;
    box-shadow: inset 0 -1px 0 #eaecef;
`;
const StyledDialogPageContent = styled.div`
    padding: 0 32px;
`;
const StyledDialogPageFooter = styled.div`
    padding: 0 32px;
`;

export const DialogPage: React.FC = ({ children }) => <StyledDialogPage>{children}</StyledDialogPage>;

export const DialogPageTitle: React.FC<{ children: string }> = ({ children }) => (
    <Head>
        <title>{children}</title>
    </Head>
);
export const DialogPageHeader = StyledDialogPageHeader;
export const DialogPageContent = StyledDialogPageContent;
export const DialogPageFooter = StyledDialogPageFooter;
