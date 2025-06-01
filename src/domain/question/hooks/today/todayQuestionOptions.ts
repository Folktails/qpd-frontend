import { queryOptions } from '@tanstack/react-query';
import { QuestionAPI } from '../../api';
import { QUERY_KEYS } from '~/shared/constants/query/query-key';

export const todayQuestionOptions = queryOptions({
	queryKey: QUERY_KEYS.question.today,
	queryFn: QuestionAPI.getToday,
});
