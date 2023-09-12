import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'redaxios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') res.status(405).json({ message: 'Method not allowed' });
  try {
    // Vimeoにアップロードするための動画枠を作成する
    const url = `${process.env.VIMEO_API_URL}/me/videos`;
    const body = {
      name: req.body.name,
      upload: {
        approach: 'tus',
        size: req.body.size,
      },
    };
    const headers = {
      Authorization: `bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.vimeo.*+json;version=3.4',
    };

    const response = await axios.post(url, body, { headers });
    // console.log(response.data);

    return res.status(200).json({
      uploadLink: response.data.upload.upload_link,
      uri: response.data.uri,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
}
