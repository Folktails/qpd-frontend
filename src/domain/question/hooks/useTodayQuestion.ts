import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '~/shared/constants/query/query-key';
import { QuestionAPI } from '../api';

export const useTodayQuestion = (id: number | undefined) => {
	return useQuery({
		queryKey: [QUERY_KEYS.question.today],
		queryFn: () => QuestionAPI.getToday(id as number),
		enabled: !!id,
	});
};
