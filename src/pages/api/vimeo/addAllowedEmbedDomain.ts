import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'redaxios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') res.status(405).json({ message: 'Method not allowed' });

  try {
    // https:// と http:// を削除して、ドメインのみの文字列にする
    const envEndpoint = process.env.NEXT_PUBLIC_END_POINT ?? '';
    const endpoint = envEndpoint.replace(/^(https?):\/\//, '');
    const url = `${process.env.VIMEO_API_URL}${req.body.uri}/privacy/domains/${endpoint}`;
    const headers = {
      Authorization: `bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.vimeo.*+json;version=3.4',
    };
    await axios.put(url, {}, { headers });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('apierror', error);
    return res.status(500).json({ message: error });
  }
};
