import { LineChart } from '@mantine/charts';
import dayjs from 'dayjs';

import type { Expense } from '~/types';

type ExpensesLineChartProps = {
  expenses: Expense[];
  startDate: string;
  endDate: string;
};

export function ExpensesLineChart({ expenses, startDate, endDate }: ExpensesLineChartProps) {
  const dayDiff = dayjs(endDate).diff(dayjs(startDate), 'day');
  const monthDiff = dayjs(endDate).diff(dayjs(startDate), 'month');

  const data =
    dayDiff > 30
      ? Array.from({ length: monthDiff + 1 }, (_, index) => {
          const date = dayjs(startDate).add(index, 'month').format('MMM, YYYY');
          const expense = expenses
            .filter(expense => dayjs(expense.date).format('MMM, YYYY') === date)
            .reduce((acc, expense) => acc + expense.amount, 0);
          return { date, Expense: expense };
        })
      : Array.from({ length: dayDiff + 1 }, (_, index) => {
          const date = dayjs(startDate).add(index, 'day').format('DD MMM');
          const expense = expenses
            .filter(expense => dayjs(expense.date).format('DD MMM') === date)
            .reduce((acc, expense) => acc + expense.amount, 0);
          return { date, Expense: expense };
        });

  return (
    <LineChart h={200} data={data} dataKey='date' series={[{ name: 'Expense', color: 'blue.6' }]} curveType='linear' />
  );
}
