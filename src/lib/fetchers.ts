import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import dayjs from 'dayjs';
import { and, asc, eq, gt, isNull, lt } from 'drizzle-orm';

import { db } from '~/db';
import { categories, expenses, templates } from '~/db/schema';
import { jsonAggBuildObject } from '~/db/utils';
import { getUser } from '~/lib/auth';

export const getExpenses = cache(
  async ({ startDate, endDate }: { startDate?: string; endDate?: string }) => {
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
          isNull(expenses.templateId),
          startDate ? gt(expenses.date, dayjs(startDate).subtract(1, 'day').toDate()) : undefined,
          endDate ? lt(expenses.date, dayjs(endDate).toDate()) : undefined
        )
      )
      .orderBy(asc(expenses.date));
    return result;
  },
  ['expenses'],
  {
    tags: ['expenses'],
    revalidate: 10,
  }
);

export const getCategories = cache(
  async () => {
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
  },
  ['categories'],
  { tags: ['categories'], revalidate: 10 }
);

export const getTemplates = cache(
  async () => {
    const user = await getUser();
    if (!user) {
      return [];
    }
    return db
      .select({
        id: templates.id,
        name: templates.name,
        expenses: jsonAggBuildObject({
          id: expenses.id,
          amount: expenses.amount,
          description: expenses.description,
          category: expenses.category,
        }),
      })
      .from(templates)
      .innerJoin(expenses, eq(templates.id, expenses.templateId))
      .where(eq(templates.username, user.username))
      .groupBy(templates.id);
  },
  ['templates'],
  { tags: ['templates'], revalidate: 10 }
);
