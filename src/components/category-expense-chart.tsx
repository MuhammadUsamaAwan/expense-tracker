import { DonutChart } from '@mantine/charts';

import type { CategoryExpense } from '~/types';

type ExpensesDonutChartProps = {
  categoryExpenses: CategoryExpense[];
};

export function CategoryExpenseChart({ categoryExpenses }: ExpensesDonutChartProps) {
  return (
    <DonutChart
      size={200}
      mx='auto'
      withLabelsLine
      withLabels
      data={categoryExpenses}
      strokeWidth={0}
      tooltipDataSource='segment'
    />
  );
}
