import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "type/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  if (id === '0') return null

  const supabaseServerClient = createPagesServerClient<Database>({ req, res });

  if (req.method === "GET") {
    const { data, error } = await supabaseServerClient.from("videos").select("*").eq("id", id).single();

    if (error) {
      return res.status(500).json({ message: error });
    }

    return res.status(200).json(data);
  }
};
