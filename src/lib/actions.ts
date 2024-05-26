/* eslint-disable @typescript-eslint/require-await */
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { compare, hash } from 'bcrypt';
import { and, eq } from 'drizzle-orm';
import { SignJWT } from 'jose';
import { type z } from 'zod';

import { env } from '~/env.mjs';
import type { JWTPayload } from '~/types';
import { db } from '~/db';
import { categories, expenses, users } from '~/db/schema';
import { getUser } from '~/lib/auth';
import {
  authSchema,
  categorySchema,
  expenseSchema,
  updateCategorySchema,
  updateExpenseSchema,
} from '~/lib/validations';

export async function signup(rawInput: z.infer<typeof authSchema>) {
  const { username, password } = authSchema.parse(rawInput);
  const hashed = await hash(password, 10);
  try {
    await db.insert(users).values({
      username,
      password: hashed,
    });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error?.code === '23505') {
      throw new Error('Username already exists');
    }
    throw new Error('Unable to signup. Please try again later.');
  }
  await setAccessToken({ username });
  revalidatePath('/', 'layout');
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
      throw new Error('Invalid email or password');
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw new Error('Unable to signin. Please try again later.');
  }
  await setAccessToken({ username });
  revalidatePath('/', 'layout');
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
  const { name } = categorySchema.parse(rawInput);
  await db.insert(categories).values({ name, username: user.username });
  revalidatePath('/', 'layout');
}

export async function updateCategory(rawInput: z.infer<typeof updateCategorySchema>) {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const { id, name } = updateCategorySchema.parse(rawInput);
  await db
    .update(categories)
    .set({ name })
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
