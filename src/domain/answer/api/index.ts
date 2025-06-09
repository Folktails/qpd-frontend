import { instance } from '~/shared/api/instance';

export interface AnswerBody {
	text: string;
	nickname: string;
	isShared: boolean;
}

export interface Question {
	id: number;
	title: string;
	subText: string;
	article: string;
	dateAt: string;
	timeAt: string;
	needPhone: boolean;
	needNickname: boolean;
	logoImageId: number | null;
	answerList: AnswerListItem[];
}

export interface AnswerListItem {
	id: number;
	questionId: number;
	userId: number;
	text: string;
	nickname: string | null;
	dateAt: string;
	createdAt: string;
	updatedAt: string;
}

const add = async (questionId: number, answer: AnswerBody) =>
	await instance.post(`question/today/${questionId}`, {
		json: answer,
	});

const getAnswerByMonth = async (
	dateAt: string,
): Promise<{
	answerDateCountMap: Record<string, number>;
}> =>
	await instance
		.get(`answer/count/month`, {
			searchParams: {
				dateAt,
			},
		})
		.json();

const getAnswerCounts = async (): Promise<{
	answerCounts: number;
}> => await instance.get(`answer/count`).json();

const getAnswerByDate = async (
	dateAt: string,
): Promise<{
	question: Question;
}> =>
	await instance
		.get(`answer/date`, {
			searchParams: {
				dateAt,
			},
		})
		.json();

export const AnswerAPI = {
	add,
	getAnswerByMonth,
	getAnswerCounts,
	getAnswerByDate,
};
