import { queryOptions } from '@tanstack/react-query';
import { QuestionAPI } from '../../api';
import { QUERY_KEYS } from '~/shared/constants/query/query-key';

export const todayQuestionInfoOptions = queryOptions({
	queryKey: QUERY_KEYS.question.todayInfo,
	queryFn: QuestionAPI.getTodayInfo,
});

export const getTodayQuestionOptions = (questionId: number) =>
	queryOptions({
		queryKey: [QUERY_KEYS.question.today, questionId],
		queryFn: () => QuestionAPI.getToday(questionId),
		enabled: !!questionId,
	});
