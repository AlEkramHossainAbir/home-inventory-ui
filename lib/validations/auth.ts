import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  stayLoggedIn: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
