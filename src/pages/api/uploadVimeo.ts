import { NextApiRequest, NextApiResponse } from "next";
import { vimeoRequest } from "./vimeo-client";

type CreateVideoAndGetUploadUrlBody = {
  name: string;
  size: string;
};

type CreateVideoVimeoResponse = {
  uploadUrl: string;
  uri: string;
};

export default async function (req: NextApiRequest, res: NextApiResponse<CreateVideoVimeoResponse>) {
  console.log("api");

  const body: CreateVideoAndGetUploadUrlBody = JSON.parse(req.body);
  console.log("body:");
  console.log(body);

  try {
    // Vimeoに動画枠を作成する。この動画枠に対してあとからアップロードする。
    const response = await vimeoRequest({
      path: "/me/videos",
      method: "POST",
      query: {
        name: body.name,
        upload: {
          approach: "tus",
          size: body.size,
        },
      },
      headers: {
        Authorization: `bearer {${process.env.VIMEO_ACCESS_TOKEN}}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      },
    });
    console.log("res:");
    console.log(response);

    return res.status(200).json({
      uploadUrl: response.upload.upload_link,
      uri: response.uri
    });
  } catch (error) {
    console.log(`APIerror: ${error}`);
  }
}
