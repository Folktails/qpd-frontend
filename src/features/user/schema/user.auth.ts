import { z } from 'zod';

export const authSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export type AuthSchema = z.infer<typeof authSchema>;
