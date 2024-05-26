import { z } from 'zod';

export const authSchema = z.object({
  username: z.string().min(5).max(30),
  password: z.string().min(5).max(30),
});

export const categorySchema = z.object({
  name: z.string().min(3).max(30),
});

export const updateCategorySchema = categorySchema.extend({
  id: z.string().uuid(),
});

export const expenseSchema = z.object({
  amount: z.number().positive(),
  category: z.string().uuid(),
  description: z.string().max(30).optional(),
  date: z.date(),
});

export const updateExpenseSchema = expenseSchema.extend({
  id: z.string().uuid(),
});
