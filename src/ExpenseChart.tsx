import { useMemo } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import dayjs from 'dayjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type ExpenseChartProps = {
  dateRange: [Date | null, Date | null];
};

export default function ExpenseChart({ dateRange }: ExpenseChartProps) {
  const [expenses] = useLocalStorage<{ date: string; category: string; amount: number }[]>({
    key: 'expenses',
    defaultValue: [],
  });

  const data = useMemo(() => {
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const startDate = dateRange[0] !== null ? new Date(dateRange[0]) : null;
      const endDate = dateRange[1] !== null ? new Date(dateRange[1]) : null;

      if (!startDate && !endDate) return true;
      if (!startDate) return expenseDate <= dayjs(endDate).endOf('day').toDate();
      if (!endDate) return expenseDate >= startDate;

      return expenseDate >= startDate && expenseDate <= dayjs(endDate).endOf('day').toDate();
    });

    const categoriesExpenses = filteredExpenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }

      acc[expense.category] += expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(categoriesExpenses);
    const values = Object.values(categoriesExpenses);

    return {
      labels,
      datasets: [
        {
          label: 'Amount: ',
          data: values,
          backgroundColor: [
            '#fd7f6f',
            '#7eb0d5',
            '#b2e061',
            '#bd7ebe',
            '#ffb55a',
            '#ffee65',
            '#beb9db',
            '#fdcce5',
            '#8bd3c7',
            '#6a67ce',
            '#ffa07a',
            '#68d8d6',
            '#a48a9e',
            '#ffd700',
            '#9ac2c5',
            '#ff69b4',
            '#5f9ea0',
            '#ff6347',
            '#a9a9a9',
            '#66cdaa',
          ],
          borderWidth: 0,
        },
      ],
    };
  }, [dateRange, expenses]);

  return data.labels.length ? <Pie data={data} /> : <p className='text-center'>No expenses found</p>;
}
