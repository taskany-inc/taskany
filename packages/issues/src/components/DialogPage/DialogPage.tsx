import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

const StyledDialogPage = styled.div`
    padding-top: 64px;
`;
const StyledDialogPageHeader = styled.div`
    padding-bottom: 64px;
`;
const StyledDialogPageContent = styled.div``;
const StyledDialogPageFooter = styled.div``;

export const DialogPage: React.FC = ({ children }) => <StyledDialogPage>{children}</StyledDialogPage>;

export const DialogPageTitle: React.FC<{ children: string }> = ({ children }) => (
    <Head>
        <title>{children}</title>
    </Head>
);
export const DialogPageHeader = StyledDialogPageHeader;
export const DialogPageContent = StyledDialogPageContent;
export const DialogPageFooter = StyledDialogPageFooter;
