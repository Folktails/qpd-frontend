import { useQuery } from '@tanstack/react-query';
import { UserAPI } from '../../api';
import { QUERY_KEYS } from '~/constants/query/query-key';

export const useSession = () =>
	useQuery({
		queryFn: () => UserAPI.Auth.session(),
		queryKey: QUERY_KEYS.auth.session,
	});
