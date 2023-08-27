import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log("body:");
  console.log(req.body);

  try {
    const url = `${process.env.VIMEO_API_URL}/me/videos`;
    const body = {
      path: req.body.uri,
    };
    const headers = {
      Authorization: `bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
    };
    await axios.delete(url, { data: body, headers });

    return res.status(200);
  } catch (error) {
    console.log(`APIerror: ${error}`);
    return res.status(500).json({ message: error });
  }
}
