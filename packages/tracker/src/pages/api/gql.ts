import { NextApiRequest, NextApiResponse } from 'next';
import redaxios from 'redaxios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const secureCookie = !(!process.env.NEXTAUTH_URL || process.env.NEXTAUTH_URL.startsWith('http://'));
    const cookieName = secureCookie ? '__Secure-next-auth.session-token' : 'next-auth.session-token';
    const token = req.cookies[cookieName];

    if (!token) res.status(402).send('Access denied');

    const apiRes = await redaxios({
        url: 'http://localhost:4000/profile',
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: req.body,
    });

    res.send(apiRes.data);
};
