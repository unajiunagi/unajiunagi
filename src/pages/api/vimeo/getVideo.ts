import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // 該当uriの動画が存在するか確認
      const url = `${process.env.VIMEO_API_URL}${req.body.uri}`;
      const headers = {
        Authorization: `bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      };

      const response = await axios.get(url, { headers });

      return res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  }
}
