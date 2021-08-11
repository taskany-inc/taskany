/* eslint-disable no-await-in-loop */
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import sharp from 'sharp';

import { getObjectStream } from '../../../lib/aws';

const apiRoute = nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
    attachParams: true,
});

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse, next) => {
    const [key, resize] = (req.query.transform as string).split('_');
    const [w, h] = resize.split('x');

    console.log(key, w, h);

    const { stream } = await getObjectStream({ key });

    console.log(stream);

    if (!stream) {
        return next();
    }

    const transform = sharp().resize({
        width: Number(w),
        height: Number(h),
    });

    stream.pipe(transform).pipe(res);
});

export default apiRoute;
