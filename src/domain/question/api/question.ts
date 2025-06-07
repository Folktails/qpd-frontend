import { instance } from '~/shared/api/instance';
import { QuestionSchema } from '../schema';

export const getTodayInfo = (): Promise<{
	questionId: number;
	timeAt: string;
	isAnswered: boolean;
}> => instance.get('question/today').json();

export const getToday = (id: number): Promise<{ question: QuestionSchema }> =>
	instance.get(`question/today/${id}`).json();
