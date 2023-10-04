import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseServer = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') res.status(405);

  const { id } = req.query;
  if (typeof id !== 'string') return res.status(400);

  const { data, error } = await supabaseServer.auth.admin.deleteUser(id);

  if (error) return res.status(500).json({ message: error });

  return res.status(200).send(data);

  return res.status(400).json({ message: 'id is not a string' });
};
