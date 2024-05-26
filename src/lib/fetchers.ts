import 'server-only';

import { db } from '~/db';
import { categories, expenses } from '~/db/schema';
import { getUser } from '~/lib/auth';

export async function getExpenses() {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const result = await db.select().from(expenses);
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
