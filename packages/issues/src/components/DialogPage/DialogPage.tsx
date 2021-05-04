import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import { renderIf } from '../../utils/conditianalRender';

interface DialogPageProps {
    title?: string;
    header?: React.ReactNode;
    content: React.ReactNode;
    footer?: React.ReactNode;
}

const StyledDialogPage = styled.div`
    padding-top: 64px;
`;
const StyledDialogPageHeader = styled.div`
    padding-bottom: 64px;
`;
const StyledDialogPageContent = styled.div``;
const StyledDialogPageFooter = styled.div``;

export const DialogPage: React.FC<DialogPageProps> = (props) => {
    const title = renderIf(
        props.title,
        <Head>
            <title>{props.title}</title>
        </Head>,
    );
    const header = renderIf(props.header, <StyledDialogPageHeader>{props.header}</StyledDialogPageHeader>);
    const content = <StyledDialogPageContent>{props.content}</StyledDialogPageContent>;
    const footer = renderIf(props.footer, <StyledDialogPageFooter>{props.footer}</StyledDialogPageFooter>);

    return (
        <>
            {title}
            <StyledDialogPage>
                {header}
                {content}
                {footer}
            </StyledDialogPage>
        </>
    );
};
