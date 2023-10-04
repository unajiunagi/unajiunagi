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
    const { id, email } = req.body;
    if (typeof id !== 'string' || typeof email !== 'string') return res.status(400);

    const { data, error } = await supabaseServerClient.from('users').select().eq('id', id).single()
    if (error) throw error;

    let stripeId: string;

    if (data.stripe_connected_id) {
      stripeId = data.stripe_connected_id;
    } else {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'JP',
        email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_profile: {
          mcc: '5815',
          url: `https://unajiunagi.com/users/${id}`,
          product_description: '映画作品、グッズの販売',
        },
        settings: {
          payouts: {
            schedule: {
              interval: 'manual',
            },
          },
        },
      });
      stripeId = account.id;

      await supabaseServerClient.from('users').update({ stripe_connected_id: stripeId }).eq('id', id);
    }
    const linkData = await stripe.accountLinks.create({
      account: stripeId,
      refresh_url: `${process.env.NEXT_PUBLIC_END_POINT}/mypage/`,
      return_url: `${process.env.NEXT_PUBLIC_END_POINT}/creator/`,
      type: 'account_onboarding',
    });

    return res.status(200).json({ url: linkData.url });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: error });
  }
};
