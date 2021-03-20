import React from 'react';
import styled from 'styled-components';

import { renderIf } from '../../utils/conditianalRender';

interface DialogPageProps {
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
    const header = renderIf(props.header, <StyledDialogPageHeader>{props.header}</StyledDialogPageHeader>);
    const content = <StyledDialogPageContent>{props.content}</StyledDialogPageContent>;
    const footer = renderIf(props.footer, <StyledDialogPageFooter>{props.footer}</StyledDialogPageFooter>);

    return (
        <StyledDialogPage>
            {header}
            {content}
            {footer}
        </StyledDialogPage>
    );
};
