import React, { useState } from 'react';
import styled from 'styled-components';
import remark from 'remark';
import parse from 'remark-parse';
import r2r from 'remark-rehype';
import stringify from 'rehype-stringify';
import { Input } from 'reakit/Input';

import { Tabs, Tab, TabMenu, TabPanel } from '../Tabs/Tabs';
import { base } from '../Input/mixins/base';

const processor = (md: string): Promise<string> =>
    // TODO: support gfm https://github.com/productivity-tools/taskany/issues/101
    new Promise((resolve) =>
        remark()
            .use(parse)
            .use(r2r)
            .use(stringify)
            .process(md, (err, res) => resolve(res.toString())),
    );

const StyledTabPanel = styled(TabPanel)`
    min-height: 100%;
`;
const StyledTextArea = styled((props) => <Input as="textarea" {...props} />)`
    ${base}

    min-height: 150px;

    resize: vertical;
`;
const StyledContainer = styled.div``;
const StyledPreview = styled.div`
    font-size: 14px;
    line-height: 20px;

    padding: 5px 12px;

    p:first-of-type {
        margin-block-start: 3px;
        margin-block-end: 3px;
    }
`;

const PreviewContainer: React.FC = ({ children: __html }) => <StyledPreview dangerouslySetInnerHTML={{ __html }} />;

export interface MarkdownEditorProps {
    value: string;
    onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
    error?: boolean;
}

const modeMap = {
    0: 'edit',
    1: 'preview',
};

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
    const [markdown, setMarkdown] = useState(value);
    const onMarkdownChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setMarkdown(e.currentTarget.value);
        if (onChange) onChange(e);
    };

    const [html, setHtml] = useState('');
    const onModeChange = async (id: number) => {
        if (modeMap[id] === 'preview') {
            const html_ = await processor(markdown);
            setHtml(html_);
        }
    };

    return (
        <StyledContainer>
            <Tabs onChange={onModeChange}>
                <TabMenu aria-label="Markdown Editor">
                    <Tab>Write</Tab>
                    <Tab>Preview</Tab>
                </TabMenu>
                <StyledTabPanel>
                    <StyledTextArea value={markdown} onChange={onMarkdownChange} />
                </StyledTabPanel>
                <StyledTabPanel>
                    <PreviewContainer>{html}</PreviewContainer>
                </StyledTabPanel>
            </Tabs>
        </StyledContainer>
    );
};
