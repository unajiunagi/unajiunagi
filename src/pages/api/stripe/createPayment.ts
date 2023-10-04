import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount, seller, customer } = req.body;
  if (typeof amount !== 'number' || typeof seller !== 'string' || typeof customer !== 'string') return res.status(400);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'jpy',
      customer,
      on_behalf_of: seller,
      transfer_data: {
        destination: seller,
      },
      application_fee_amount: Math.ceil(amount * 0.1),
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
