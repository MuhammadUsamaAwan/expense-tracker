import { z } from 'zod';

export const authSchema = z.object({
  username: z.string().min(5).max(30).trim(),
  password: z.string().min(5).max(30).trim(),
});

export const categorySchema = z.object({
  name: z.string().min(3).max(30).trim(),
  color: z.string().min(1).trim(),
});

export const updateCategorySchema = categorySchema.extend({
  id: z.string().uuid(),
});

export const expenseSchema = z.object({
  amount: z.number().positive(),
  category: z.string().uuid(),
  description: z.string().max(150).trim().optional(),
  date: z.date(),
});

export const updateExpenseSchema = expenseSchema.extend({
  id: z.string().uuid(),
});
