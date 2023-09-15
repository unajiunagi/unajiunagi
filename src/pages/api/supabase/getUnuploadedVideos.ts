import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "type/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient<Database>({ req, res });

  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });
  const { data, error } = await supabaseServerClient.from("videos").select().eq("is_uploaded", false).order("updated_at", { ascending: false });

  console.error('error', error);
  
  if (error) res.status(500).json({ message: error });

  return res.status(200).json(data);
};
