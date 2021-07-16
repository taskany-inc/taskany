import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useQueueByKeyQuery } from '@/generated/queries';
import { textColorTertiary } from '@/generated/tokens';
import { Link, Icon, NavBar, NavBarLink, Button, H3, H4 } from '@taskany/core/components';

import NotFound from '../../404';
import {
    InfoPage,
    InfoPageTitle,
    InfoPageHeader,
    InfoPageContent,
    InfoPageHeaderTitle,
} from '../../../components/InfoPage/InfoPage';
import { defaultPageProps } from '../../../hooks/defaultPageProps';
import { routes } from '../../../hooks/router';

const timeAgo = (previous) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = Date.now() - Date.parse(previous);

    if (elapsed < msPerMinute) {
        return `${Math.round(elapsed / 1000)} seconds ago`;
        // eslint-disable-next-line no-else-return
    } else if (elapsed < msPerHour) {
        return `${Math.round(elapsed / msPerMinute)} minutes ago`;
    } else if (elapsed < msPerDay) {
        return `${Math.round(elapsed / msPerHour)} hours ago`;
    } else if (elapsed < msPerMonth) {
        return `${Math.round(elapsed / msPerDay)} days ago`;
    } else if (elapsed < msPerYear) {
        return `${Math.round(elapsed / msPerMonth)} months ago`;
    } else {
        return `${Math.round(elapsed / msPerYear)} years ago`;
    }
};

const StyledQueueMeta = styled.div`
    display: inline-block;
    vertical-align: top;
    padding-left: 5px;
`;

const StyledTitle = styled(H3)``;

const StyledDescription = styled.div`
    font-size: 14px;

    padding-top: 8px;
`;

const StyledIcon = styled(Icon)`
    display: inline-block;
`;

// TODO: dependencies
interface InfoTableItemProps {
    id: string;
    status?: string;
    title: string;
    author?: string | null;
    createdAt?: string;
    comments?: number;
}

interface InfoTableProps {}

const StyledInfoTable = styled.div`
    border: 1px solid #e1e4e8;
    border-radius: 6px;

    overflow: hidden;
    max-width: 1200px;
`;
const StyledInfoTableHeader = styled.div`
    padding: 16px;
    margin: -1px -1px 0;

    background-color: #f6f8fa;

    border-color: #e1e4e8;
    border-left-width: 1px;
    border-right-width: 1px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
`;
const StyledInfoTableItem = styled.div`
    padding: 10px 16px;

    border-top: 1px solid #ebedef;

    &:hover {
        background-color: #f6f8fa;
    }
`;
const StyledInfoTableItemInfo = styled.div`
    margin-top: 8px;

    font-size: 12px;
    color: ${textColorTertiary};
`;

const InfoTableItem: React.FC<InfoTableItemProps> = ({ title, id, createdAt, author }) => {
    return (
        <StyledInfoTableItem>
            <H4>
                <Link type="inline" href={routes.issue(id)}>
                    {title}
                </Link>
            </H4>
            <StyledInfoTableItemInfo>
                #{id} created {timeAgo(createdAt)} by {author}
            </StyledInfoTableItemInfo>
        </StyledInfoTableItem>
    );
};

const InfoTable: React.FC<InfoTableProps> = ({ children }) => {
    return (
        <StyledInfoTable>
            <StyledInfoTableHeader>Issues</StyledInfoTableHeader>
            {children}
        </StyledInfoTable>
    );
};

const StyledFilters = styled.div`
    padding: 20px 0;
`;

export const getServerSideProps = defaultPageProps;
export default function Page() {
    const router = useRouter();
    const keyFromQueryString = router.query.key as string;

    if (!keyFromQueryString) return <NotFound />;

    const { data, loading } = useQueueByKeyQuery({ variables: { key: keyFromQueryString } });

    if (loading) return null;
    if (!data?.queueByKey) return <NotFound />;

    const { key, title, description, issues } = data.queueByKey;

    return (
        <InfoPage>
            <InfoPageTitle>{title}</InfoPageTitle>

            <InfoPageHeader>
                <InfoPageHeaderTitle>
                    <StyledIcon type="bookmark" size="s" />
                    <StyledQueueMeta>
                        <StyledTitle>{title}</StyledTitle>
                        {description && <StyledDescription>{description}</StyledDescription>}
                    </StyledQueueMeta>
                </InfoPageHeaderTitle>

                <NavBar url={router.asPath}>
                    <NavBarLink url={routes.queue(key)} text="Issues" icon={<Icon type="bulbOn" size="s" />} />
                    <NavBarLink url={routes.queueBoards(key)} text="Boards" icon={<Icon type="kanban" size="s" />} />
                    <NavBarLink
                        url={routes.queueInsights(key)}
                        text="Insights"
                        icon={<Icon type="pieChart" size="s" />}
                    />
                    <NavBarLink url={routes.queueSettigns(key)} text="Settings" icon={<Icon type="cog" size="s" />} />
                </NavBar>
            </InfoPageHeader>

            <InfoPageContent>
                <StyledFilters>
                    <Button view="primary" type="link" href={routes.createIssue()} text="New issue" />
                </StyledFilters>

                <InfoTable>
                    {issues.map((issue) => (
                        <InfoTableItem
                            key={issue.key}
                            id={issue.key}
                            title={issue.title}
                            author={issue.createdBy.name}
                            createdAt={issue.createdAt}
                        />
                    ))}
                </InfoTable>
            </InfoPageContent>
        </InfoPage>
    );
}
