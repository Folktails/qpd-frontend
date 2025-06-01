import { z } from 'zod';

export const questionSchema = z.object({
	id: z.number(),
	title: z.string(),
	subText: z.string(),
	dateAt: z.string(),
	needPhone: z.boolean(),
	needNickname: z.boolean(),
	hasAnswer: z.boolean(),
});

export type QuestionSchema = z.infer<typeof questionSchema>;
