import dayjs from 'dayjs';
import { and, asc, eq, gt, lt } from 'drizzle-orm';

import 'server-only';

import { db } from '~/db';
import { categories, expenses } from '~/db/schema';
import { getUser } from '~/lib/auth';

export async function getExpenses({ startDate, endDate }: { startDate?: string; endDate?: string }) {
  const user = await getUser();
  if (!user) {
    return [];
  }
  const result = await db
    .select({
      id: expenses.id,
      amount: expenses.amount,
      date: expenses.date,
      description: expenses.description,
      category: {
        id: categories.id,
        name: categories.name,
        color: categories.color,
      },
    })
    .from(expenses)
    .innerJoin(categories, eq(expenses.category, categories.id))
    .where(
      and(
        eq(expenses.username, user.username),
        startDate ? gt(expenses.date, dayjs(startDate).subtract(1, 'day').toDate()) : undefined,
        endDate ? lt(expenses.date, dayjs(endDate).toDate()) : undefined
      )
    )
    .orderBy(asc(expenses.date));
  return result;
}

export async function getCategories() {
  const user = await getUser();
  if (!user) {
    return [];
  }
  return db
    .select({
      id: categories.id,
      name: categories.name,
      color: categories.color,
    })
    .from(categories)
    .where(eq(categories.username, user.username));
}
