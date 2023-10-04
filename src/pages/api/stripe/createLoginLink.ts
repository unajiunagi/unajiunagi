import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Database } from 'type/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createPagesServerClient<Database>({ req, res });

  try {
    const { id } = req.body;

    const { data, error } = await supabaseServerClient.from('users').select('stripe_connected_id').eq('id', id).single()
    if (error) throw error;

    const loginLink = await stripe.accounts.createLoginLink(data.stripe_connected_id!);

    return res.status(200).json({ url: loginLink.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};
