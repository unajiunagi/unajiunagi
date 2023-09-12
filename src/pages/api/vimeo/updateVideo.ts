import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'redaxios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') res.status(405).json({ message: 'Method not allowed' });

  try {
    const url = `${process.env.VIMEO_API_URL}${req.body.uri}`;
    const body = req.body.object ?? {};
    const headers = {
      Authorization: `bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.vimeo.*+json;version=3.4',
    };
    await axios.patch(url, body, { headers });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(`APIerror: ${error}`);
    return res.status(500).json({ message: error });
  }
}
