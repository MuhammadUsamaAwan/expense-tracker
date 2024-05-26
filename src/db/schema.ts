import { sql } from 'drizzle-orm';
import { pgTable, real, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  username: varchar('username', { length: 255 }).primaryKey(),
  password: varchar('password', { length: 255 }),
});

export const categories = pgTable('categories', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  color: varchar('color', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 })
    .references(() => users.username)
    .notNull(),
});

export const expenses = pgTable('expenses', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  amount: real('amount').notNull(),
  category: uuid('category')
    .references(() => categories.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  username: varchar('username', { length: 255 })
    .references(() => users.username)
    .notNull(),
  description: varchar('description', { length: 255 }),
  date: timestamp('date').notNull(),
});
