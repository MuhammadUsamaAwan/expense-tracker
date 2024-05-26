'use client';

import { DonutChart } from '@mantine/charts';

import type { Expense } from '~/types';

type ExpensesDonutChartProps = {
  expenses: Expense[];
};

type ExpenseSummary = {
  name: string;
  value: number;
  color: string;
};

function transformExpenses(expenses: Expense[]): ExpenseSummary[] {
  const summaryMap = new Map<
    string,
    {
      value: number;
      color: string;
    }
  >();

  expenses.forEach(expense => {
    const categoryName = expense.category.name;
    const amount = expense.amount;
    if (summaryMap.has(categoryName)) {
      summaryMap.set(categoryName, {
        value: summaryMap.get(categoryName)!.value + amount,
        color: expense.category.color,
      });
    } else {
      summaryMap.set(categoryName, {
        value: amount,
        color: expense.category.color,
      });
    }
  });

  const summary: ExpenseSummary[] = [];
  summaryMap.forEach((value, name) => {
    summary.push({ name, value: value.value, color: value.color });
  });

  return summary;
}

export function ExpensesDonutChart({ expenses }: ExpensesDonutChartProps) {
  return (
    <DonutChart
      size={200}
      mx='auto'
      withLabelsLine
      withLabels
      data={transformExpenses(expenses)}
      strokeWidth={0}
      tooltipDataSource='segment'
    />
  );
}
