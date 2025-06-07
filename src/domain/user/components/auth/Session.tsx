import { useEffect } from 'react';
import { UserAPI } from '../../api';
import { useUserActions } from '../../store';

export const SessionCheck = () => {
	const { setUser } = useUserActions();
	useEffect(() => {
		(async () => {
			try {
				const { user } = await UserAPI.Auth.session();
				setUser(user);
			} catch {
				await UserAPI.Auth.logout();
			}
		})();
	}, []);

	return <></>;
};
