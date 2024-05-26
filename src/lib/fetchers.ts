import { asc, eq } from 'drizzle-orm';

import 'server-only';

import { db } from '~/db';
import { categories, expenses } from '~/db/schema';
import { getUser } from '~/lib/auth';

export async function getExpenses() {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
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
      },
    })
    .from(expenses)
    .innerJoin(categories, eq(expenses.category, categories.id))
    .where(eq(expenses.username, user.username))
    .orderBy(asc(expenses.date));
  return result;
}

export function getCategories() {
  return db
    .select({
      id: categories.id,
      name: categories.name,
    })
    .from(categories);
}
