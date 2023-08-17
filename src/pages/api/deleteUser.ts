import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createPagesServerClient<Database>({
    req,
    res,
  });
  const id = req.body.id;
  if (id) {
    const { data: deletedUser, error } = await supabaseServerClient.auth.admin.deleteUser(id);

    if (error) {
      console.log(error.message);
      return res.status(401).send(error);
    }
    return res.status(200).send(deletedUser);
  }
}
