import { MovieDescription } from 'components/common/MovieDescription';
import { WatchPage } from 'components/watchPage/WatchPage';
import { useToasts } from 'hooks/useToasts';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { staticPath } from 'type/$path';

export default () => {
  const { query } = useRouter();
  const { errorToast } = useToasts();
  const { data, error } = useSWR(`/api/getVideo/${query.id}`);

  if (error) {
    errorToast({ title: 'データの取得に失敗しました。' });
    return null;
  }

  return (
    <>
      <MovieDescription bgimg={staticPath.logo_png} title='title' description='紹介文' />
      <WatchPage video={data} />
    </>
  );
};
