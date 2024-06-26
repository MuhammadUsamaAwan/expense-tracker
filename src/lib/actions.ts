/* eslint-disable @typescript-eslint/require-await */
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { compare, hash } from 'bcryptjs';
import { and, eq } from 'drizzle-orm';
import { SignJWT } from 'jose';
import { type z } from 'zod';

import { env } from '~/env.mjs';
import type { JWTPayload } from '~/types';
import { db } from '~/db';
import { categories, expenses, templates, users } from '~/db/schema';
import { getUser } from '~/lib/auth';
import {
  addFromTemplateSchema,
  authSchema,
  categorySchema,
  expenseSchema,
  templateSchema,
  updateCategorySchema,
  updateExpenseSchema,
  updateTemplateSchema,
} from '~/lib/validations';

export async function signup(rawInput: z.infer<typeof authSchema>) {
  const { username, password } = authSchema.parse(rawInput);
  const hashed = await hash(password, 10);
  try {
    await db.insert(users).values({
      username,
      password: hashed,
    });
    await setAccessToken({ username });
    revalidatePath('/', 'layout');
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error?.code === '23505') {
      return { error: 'Username already exists' };
    }
    return { error: 'Unable to signup. Please try again later.' };
  }
}

export async function signin(rawInput: z.infer<typeof authSchema>) {
  const { username, password } = authSchema.parse(rawInput);
  try {
    const [user] = await db
      .select({
        password: users.password,
      })
      .from(users)
      .where(eq(users.username, username));
    if (!user || !user.password) {
      return { error: 'Invalid email or password' };
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      return { error: 'Invalid email or password' };
    }
    await setAccessToken({ username });
    revalidatePath('/', 'layout');
  } catch (error) {
    return { error: 'Unable to signin. Please try again later.' };
  }
}

export async function setAccessToken(jwtPayload: JWTPayload) {
  const accessToken = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15d')
    .sign(new TextEncoder().encode(env.JWT_SECRET));

  cookies().set('token', accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1296000,
  });
}

export async function signout() {
  cookies().set('token', '', {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 0,
  });
  revalidatePath('/', 'layout');
}

export async function addCategory(rawInput: z.infer<typeof categorySchema>) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const { name, color } = categorySchema.parse(rawInput);
  await db.insert(categories).values({ name, color, username: user.username });
  revalidatePath('/', 'layout');
}

export async function updateCategory(rawInput: z.infer<typeof updateCategorySchema>) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const { id, name, color } = updateCategorySchema.parse(rawInput);
  await db
    .update(categories)
    .set({ name, color })
    .where(and(eq(categories.id, id), eq(categories.username, user.username)));
  revalidatePath('/', 'layout');
}

export async function deleteCategory(id: string) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  await db.delete(categories).where(and(eq(categories.id, id), eq(categories.username, user.username)));
  revalidatePath('/', 'layout');
}

export async function addExpense(rawInput: z.infer<typeof expenseSchema>) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const { amount, date, category, description } = expenseSchema.parse(rawInput);
  await db.insert(expenses).values({ amount, date, category, description, username: user.username });
  revalidatePath('/');
}

export async function updateExpense(rawInput: z.infer<typeof updateExpenseSchema>) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const { id, amount, date, category, description } = updateExpenseSchema.parse(rawInput);
  await db
    .update(expenses)
    .set({ amount, date, category, description })
    .where(and(eq(expenses.id, id), eq(expenses.username, user.username)));
  revalidatePath('/');
}

export async function deleteExpense(id: string) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  await db.delete(expenses).where(and(eq(expenses.id, id), eq(expenses.username, user.username)));
  revalidatePath('/');
}

export async function addTemplate(rawInput: z.infer<typeof templateSchema>) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const { name, expenses: _expenses } = templateSchema.parse(rawInput);
  const [template] = await db.insert(templates).values({ name, username: user.username }).returning({
    id: templates.id,
  });
  if (!template) {
    throw new Error('Unable to create template');
  }
  await db.insert(expenses).values(_expenses.map(e => ({ ...e, username: user.username, templateId: template.id })));
  revalidatePath('/');
  revalidatePath('/manage-templates');
}

export async function updateTemplate(rawInput: z.infer<typeof updateTemplateSchema>) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const { id, name, expenses: _expenses } = updateTemplateSchema.parse(rawInput);
  await db
    .update(templates)
    .set({ name })
    .where(and(eq(templates.id, id), eq(templates.username, user.username)));
  await db.delete(expenses).where(and(eq(expenses.templateId, id), eq(expenses.username, user.username)));
  await db.insert(expenses).values(_expenses.map(e => ({ ...e, username: user.username, templateId: id })));
  revalidatePath('/');
  revalidatePath('/manage-templates');
}

export async function deleteTemplate(id: string) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  await db.delete(templates).where(and(eq(templates.id, id), eq(templates.username, user.username)));
  await db.delete(expenses).where(and(eq(expenses.templateId, id), eq(expenses.username, user.username)));
  revalidatePath('/');
  revalidatePath('/manage-templates');
}

export async function addFromTemplate(rawInput: z.infer<typeof addFromTemplateSchema>) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const { date, template } = addFromTemplateSchema.parse(rawInput);
  const _expenses = await db
    .select({
      amount: expenses.amount,
      category: expenses.category,
      description: expenses.description,
    })
    .from(expenses)
    .where(eq(expenses.templateId, template));
  await db.insert(expenses).values(
    _expenses.map(e => ({
      ...e,
      date,
      username: user.username,
    }))
  );
  revalidatePath('/');
}
