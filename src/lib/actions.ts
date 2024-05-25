/* eslint-disable @typescript-eslint/require-await */
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { compare, hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';
import { type z } from 'zod';

import { env } from '~/env.mjs';
import type { JWTPayload } from '~/types';
import { db } from '~/db';
import { users } from '~/db/schema';

import { authSchema } from './validations';

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
