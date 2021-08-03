/* eslint-disable no-await-in-loop */
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { nanoid } from 'nanoid';
import sharp from 'sharp';
import multer from 'multer';

import { upload, getUrl, getObjectStream } from '../../lib/aws';

interface ExtendedReq {
    files: Array<{
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        buffer: Buffer;
        size: number;
    }>;
}

const storage = multer.memoryStorage();
const uploader = multer({ storage });

const apiRoute = nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use((req: NextApiRequest, res: NextApiResponse, next) => {
    const secureCookie = !(!process.env.NEXTAUTH_URL || process.env.NEXTAUTH_URL.startsWith('http://'));
    const cookieName = secureCookie ? '__Secure-next-auth.session-token' : 'next-auth.session-token';
    const token = req.cookies[cookieName];

    if (!token) return res.status(402).send('Access denied');

    next();
});

apiRoute.use(uploader.any());

apiRoute.post<ExtendedReq>(async (req, res: NextApiResponse) => {
    const assets: Array<{ key: string; url: string }> = [];

    for (const file of req.files) {
        const id = nanoid();

        const { key, success } = await upload({ body: file.buffer, key: id, contentType: file.mimetype });
        const url = await getUrl({ key });

        if (success) {
            assets.push({
                key,
                url,
            });
        }
    }

    res.status(200).json({ assets });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
