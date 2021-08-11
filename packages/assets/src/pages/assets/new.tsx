/* eslint-disable no-await-in-loop */
import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useCreateAssetMutation, useAllAssetsLazyQuery } from '@/generated/queries';
import { Form, FormField, H1, TimelineComment, Icon } from '@taskany/core/components';
import { is } from '@taskany/core/utils/styles';
import { buttonPrimaryBackgroundColor } from '@taskany/core/tokens';
import { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';

import {
    DialogPage,
    DialogPageTitle,
    DialogPageHeader,
    DialogPageContent,
} from '../../components/DialogPage/DialogPage';
import { defaultPageProps } from '../../hooks/defaultPageProps';

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

const StyledIcon = styled(Icon)`
    top: 3px;
    left: 5px;
    position: relative;
    margin-right: 5px;

    cursor: pointer;

    &:hover {
        color: #000;
    }

    ${is(
        { active: true },
        css`
            color: ${buttonPrimaryBackgroundColor};

            &:hover {
                color: ${buttonPrimaryBackgroundColor};
            }
        `,
    )}
`;

const StyledDropZone = styled.div`
    border: 1px dashed #eaecef;
    border-radius: 10px;

    background-color: #fafbfc;

    min-height: 100px;

    padding: 8px;

    text-align: center;
    color: #ddd;
`;

const StyledTimelineAsset = styled.div`
    position: relative;

    padding: 20px 0px;

    &:first-child {
        padding-top: 20px;
    }
`;
const StyledTimelineLine = styled.div`
    z-index: 1;
    position: absolute;
    left: 80px;

    height: 105px;

    width: 2px;

    background-color: #eaecef;
`;
const StyledTimelineAssetPreview = styled.img`
    z-index: 2;
    position: relative;

    border-radius: 4px;
`;

const StyledTimelineAssetDot = styled.div`
    z-index: 2;
    position: absolute;
    left: 77px;
    top: 50px;

    border-radius: 100%;

    height: 8px;
    width: 8px;

    background-color: #eaecef;
`;

const StyledTimelineAssetInfo = styled.div`
    z-index: 2;
    position: absolute;
    left: 95px;
    top: 45px;

    font-size: 14px;
    color: #888;
`;

interface TimelineAssetProps {
    id: string;
    url: string;
    createdAt: string;
}
const TimelineAsset: React.FC<TimelineAssetProps> = ({ id, url, createdAt }) => {
    const [copied, setCopied] = useState<boolean>(false);
    const [copiedResize, setCopiedResize] = useState<boolean>(false);

    return (
        <StyledTimelineAsset>
            <StyledTimelineLine />
            <StyledTimelineAssetDot />

            <StyledTimelineAssetPreview src={url} width="60px" height="60px" />
            <StyledTimelineAssetInfo>
                {id} — uploaded {timeAgo(createdAt)}{' '}
                <StyledIcon
                    size="s"
                    active={copied}
                    type={copied ? 'clipboardTick' : 'clipboardPlus'}
                    onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(url);
                        setCopied(true);
                        setTimeout(() => {
                            setCopied(false);
                        }, 3000);
                    }}
                />
                <StyledIcon
                    size="s"
                    active={copiedResize}
                    type="zoomOut"
                    onClick={(e) => {
                        e.preventDefault();
                        // navigator.clipboard.writeText(url);
                        setCopiedResize(true);
                        setTimeout(() => {
                            setCopiedResize(false);
                        }, 3000);
                    }}
                />
            </StyledTimelineAssetInfo>
        </StyledTimelineAsset>
    );
};

export const getServerSideProps = defaultPageProps;
export default function Page() {
    const [session] = useSession();
    const [userAssets, setUserAssets] = useState<any>([]);
    const [createAssetMutation] = useCreateAssetMutation();
    const [allAssetsQuery, { data: assetsQueryRes }] = useAllAssetsLazyQuery();

    useEffect(() => {
        allAssetsQuery();
    }, []);

    useEffect(() => {
        assetsQueryRes?.allAssets && setUserAssets(assetsQueryRes?.allAssets);
    }, [assetsQueryRes]);

    const onDrop = useCallback(
        async (acceptedFiles) => {
            const formData = new FormData();

            acceptedFiles.forEach((file, i) => {
                formData.append(i, file);
            });

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const { assets } = await res.json();

            console.log('uploaded', assets);

            if (assets.length) {
                const saved = [];
                for (const asset of assets) {
                    const { data } = await createAssetMutation({
                        variables: {
                            asset,
                        },
                    });

                    console.log('saved', data);
                    // @ts-ignore
                    saved.push(data?.createAsset);
                }

                setUserAssets([...saved.reverse(), ...userAssets]);
            }
        },
        [userAssets],
    );
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <DialogPage>
            <DialogPageTitle>Create new asset</DialogPageTitle>

            <DialogPageHeader>
                <H1>Create new asset</H1>
            </DialogPageHeader>

            <DialogPageContent>
                {session?.user?.image && (
                    <TimelineComment image={session.user.image}>
                        <Form>
                            <FormField type="input">
                                <StyledDropZone {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>
                                        Hey, {session.user.name}, drag 'n' drop some files here, or click to select
                                        files
                                    </p>
                                </StyledDropZone>
                            </FormField>
                        </Form>
                    </TimelineComment>
                )}

                {userAssets.map((asset, i) => (
                    <TimelineAsset key={i} id={asset.key} url={asset.url} createdAt={asset.createdAt} />
                ))}
            </DialogPageContent>
        </DialogPage>
    );
}
