import { z } from 'zod';

export const authSchema = z.object({
  username: z.string().trim().min(5).max(30),
  password: z.string().trim().min(5).max(30),
});

export const categorySchema = z.object({
  name: z.string().trim().min(3).max(30),
  color: z.string().trim().min(1),
});

export const updateCategorySchema = categorySchema.extend({
  id: z.string().uuid(),
});

export const expenseSchema = z.object({
  amount: z.number().positive(),
  category: z.string().uuid(),
  description: z.string().trim().max(150).optional(),
  date: z.date(),
});

export const updateExpenseSchema = expenseSchema.extend({
  id: z.string().uuid(),
});

export const templateSchema = z.object({
  name: z.string().trim().min(3).max(30),
  expenses: z.array(expenseSchema.omit({ date: true })),
});

export const updateTemplateSchema = templateSchema.extend({
  id: z.string().uuid(),
});
