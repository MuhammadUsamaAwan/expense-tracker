import type { getCategories, getExpenses, getTemplates } from '~/lib/fetchers';

export type JWTPayload = {
  username: string;
};

export type CategoryExpense = {
  name: string;
  value: number;
  color: string;
};

export type Category = Awaited<ReturnType<typeof getCategories>>[number];

export type Expense = Awaited<ReturnType<typeof getExpenses>>[number];

export type Template = Awaited<ReturnType<typeof getTemplates>>[number];
