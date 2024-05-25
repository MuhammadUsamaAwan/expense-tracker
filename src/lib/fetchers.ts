import 'server only';

import { db } from '~/db';
import { expenses } from '~/db/schema';

export async function getExpenses() {
  const result = await db.select().from(expenses);
  return result;
}
