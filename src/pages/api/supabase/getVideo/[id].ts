import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from 'type/supabase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') res.status(405).json({ message: 'Method not allowed' });

  const { id } = req.query;
  const supabaseServerClient = createPagesServerClient<Database>({ req, res });
  const { data, error } = await supabaseServerClient.from('videos').select('*').eq('id', id).single();

  if (error) res.status(500).json({ message: error });

  return res.status(200).json(data);
};
