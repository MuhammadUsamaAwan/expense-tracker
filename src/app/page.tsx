import { Suspense } from 'react';
import Loading from '~/app/loading';
import dayjs from 'dayjs';

import ExpensePage from '~/components/expense-page';

type HomePageProps = {
  searchParams: {
    startDate: string | undefined;
    endDate: string | undefined;
  };
};

export default function HomePage({ searchParams }: HomePageProps) {
  const startDate = searchParams.startDate ?? dayjs().startOf('month').format('YYYY-MM-DD');
  const endDate = searchParams.endDate ?? dayjs().endOf('month').format('YYYY-MM-DD');

  return (
    <Suspense key={`${startDate}_${endDate}`} fallback={<Loading />}>
      <ExpensePage startDate={startDate} endDate={endDate} />
    </Suspense>
  );
}
