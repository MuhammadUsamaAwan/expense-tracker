import { z } from 'zod';

export const authSchema = z.object({
  username: z.string().min(6).max(30),
  password: z.string().min(8).max(30),
});
