import gql from 'graphql-tag';

export const createAsset = gql`
    mutation createAsset($asset: CreateAssetInput!) {
        createAsset(asset: $asset) {
            key
            url
            createdAt
        }
    }
`;

export const allAssets = gql`
    query allAssets {
        allAssets {
            key
            url
            createdAt
        }
    }
`;
