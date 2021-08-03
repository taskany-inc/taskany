import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    signatureVersion: 'v4',
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    s3ForcePathStyle: true,
});

const bucketName = process.env.S3_BUCKET!;

export async function upload({ key, body, contentType }) {
    try {
        const response = await s3
            .upload({
                Bucket: bucketName,
                Key: key,
                Body: body,
                ContentType: contentType,
            })
            .promise();

        if (!response) {
            return {
                key,
                success: false,
                error: new Error('Upload failed'),
            };
        }

        return {
            key,
            success: true,
        };
    } catch (err) {
        return {
            key,
            success: false,
            error: err,
        };
    }
}

export async function getObjectStream({ key }) {
    const response = await s3
        .headObject({
            Bucket: bucketName,
            Key: key,
        })
        .promise();

    if (!response) {
        return {
            key,
            success: false,
            error: new Error('Upload failed'),
        };
    }

    const stream = s3
        .getObject({
            Bucket: bucketName,
            Key: key,
        })
        .createReadStream();

    const { ContentLength, LastModified, ETag } = response;

    return {
        stream,
        meta: {
            ContentLength,
            LastModified,
            ETag,
        },
    };
}

export async function getUrl({ key }) {
    const url = await s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: key,
    });

    return url.split('?')[0];
}
