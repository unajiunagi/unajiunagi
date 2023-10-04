import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from 'type/supabase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') res.status(405);

  const { id } = req.query;
  if (typeof id !== 'string') return res.status(400);
  const supabaseServerClient = createPagesServerClient<Database>({ req, res });

  const { data, error } = await supabaseServerClient.from('videos').select('*').eq('id', id).single();

  if (error) res.status(500).json({ message: error });

  return res.status(200).json(data);
};
