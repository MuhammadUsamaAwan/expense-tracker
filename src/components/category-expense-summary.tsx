'use client';

import { Tabs } from '@mantine/core';

import type { CategoryExpense, Expense } from '~/types';
import { CategoryExpenseChart } from '~/components/category-expense-chart';
import { CategoryExpenseTable } from '~/components/category-expense-table';

type ExpenseCategoriesSummaryProps = {
  expenses: Expense[];
};

function transformExpenses(expenses: Expense[]): CategoryExpense[] {
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

  const summary: CategoryExpense[] = [];
  summaryMap.forEach((value, name) => {
    summary.push({ name, value: value.value, color: value.color });
  });

  return summary;
}

export function CategoryExpenseSummary({ expenses }: ExpenseCategoriesSummaryProps) {
  const categoryExpenses = transformExpenses(expenses);

  return (
    <Tabs defaultValue='chart'>
      <Tabs.List mb='sm'>
        <Tabs.Tab value='chart'>Chart</Tabs.Tab>
        <Tabs.Tab value='table'>Table</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='chart'>
        <CategoryExpenseChart categoryExpenses={categoryExpenses} />
      </Tabs.Panel>
      <Tabs.Panel value='table' mb='md'>
        <CategoryExpenseTable categoryExpenses={categoryExpenses} />
      </Tabs.Panel>
    </Tabs>
  );
}
