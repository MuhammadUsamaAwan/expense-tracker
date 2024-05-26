'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';

export function DateRangeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const startDateParams = searchParams.get('startDate');
  const startDate = dayjs(startDateParams).isValid()
    ? dayjs(startDateParams).toDate()
    : dayjs().startOf('month').toDate();
  const endDateParams = searchParams.get('endDate');
  const endDate = dayjs(endDateParams).isValid() ? dayjs(endDateParams).toDate() : dayjs().endOf('month').toDate();

  const [value, setValue] = useState<[Date | null, Date | null]>([startDate, endDate]);

  return (
    <DatePickerInput
      type='range'
      placeholder='Pick dates range'
      value={value}
      onChange={val => {
        setValue(val);
        if (val[0] && val[1]) {
          router.push(
            `/?startDate=${dayjs(val[0]).format('YYYY-MM-DD')}&endDate=${dayjs(val[1]).format('YYYY-MM-DD')}`
          );
        }
      }}
      mb='md'
    />
  );
}
