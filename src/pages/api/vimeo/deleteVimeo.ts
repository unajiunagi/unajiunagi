import { NextApiRequest, NextApiResponse } from "next";
import { vimeoRequest } from "./vimeo-client";

type Body = {
  uri: string;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log("api");
  const body: Body = JSON.parse(req.body);
  const { uri } = body;
  
  console.log("body:");
  console.log(body);

  try {
    await vimeoRequest({
      method: "DELETE",
      path: uri,
    });
    return res.status(200);
  } catch (error) {
    console.log(`APIerror: ${error}`);
  }
}
