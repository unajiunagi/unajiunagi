import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useUser } from '@supabase/auth-helpers-react';
import { Cast } from 'components/watchPage/Cast';
import { Staff } from 'components/watchPage/Staff';
import { useToasts } from 'hooks/useToasts';
import { useEffect, useState } from 'react';
import axios from 'redaxios';
import useSWR from 'swr';
import { VideoData } from 'type/videoData';

type Props = {
  video: VideoData;
};

export const WatchPage = ({ video }: Props) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const [clientSecret, setClientSecret] = useState('');
  const { errorToast } = useToasts();
  const user = useUser();
  const { data: userData, error: userError } = useSWR(`/api/getCustomerId/${user?.id}`);
  const { data: creatorData, error: creatorError } = useSWR(`/api/getConnectedAccountId/${video.creator_id}`);

  if (userError || creatorError) {
    errorToast({ title: 'データの取得に失敗しました。' });
    return null;
  }

  useEffect(() => {
    if (!userData || !creatorData) return;
    (async () => {
      // clientSecretを取得してstateにセット
      const res = await axios.post('/api/createPayment', { amount: video.amount, seller: creatorData.stripe_connected_id, customer: userData.stripe_customer_id });
      setClientSecret(res.data.clientSecret);
    })();
  }, [userData, creatorData]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
    },
  };

  return (
    <>
      <Stack spacing={8} width='90%' mx='auto' mt={2} mb={6}>
        <Text>
          {`${video.birth_year}`}年 | {`${video.running_time}`}分
        </Text>
        <HStack spacing='4'>
          <Button size='lg' rounded='3xl'>
            レンタル 3日{`${video.amount}`}¥
          </Button>
        </HStack>
        <HStack align='top' spacing='20'>
          <Staff />
          <Cast />
        </HStack>
      </Stack>

      <Elements options={options} stripe={stripePromise}>
        {/* <CheckoutForm clientSecret={clientSecret} /> */}
      </Elements>
    </>
  );
};
