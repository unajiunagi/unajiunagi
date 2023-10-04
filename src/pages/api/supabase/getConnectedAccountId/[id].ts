import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from 'type/supabase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') res.status(405);

  const { id } = req.query;
  const connectedId = id as string;
  const supabaseServerClient = createPagesServerClient<Database>({ req, res });

  const { data, error } = await supabaseServerClient.from('users').select('stripe_connected_id').eq('id', connectedId).single();

  if (error) return res.status(500).json({ message: error });

  return res.status(200).json(data);
};
