import { instance } from '~/shared/api/instance';

export interface AnswerBody {
	text: string;
	nickname: string;
	isShared: boolean;
}

const add = async (questionId: number, answer: AnswerBody) =>
	await instance.post(`question/today/${questionId}`, {
		json: answer,
	});

export const AnswerAPI = { add };
