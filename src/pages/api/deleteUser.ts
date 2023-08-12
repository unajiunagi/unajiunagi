import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const supabaseServer = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.id
  if (id) {
    const { data: deletedUser, error } = await supabaseServer.auth.admin.deleteUser(id);

    if (error) {
      console.log(error.message);
      return res.status(401).send(error);
    }
    return res.status(200).send(deletedUser);
  }
}
