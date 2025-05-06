import { useEffect } from 'react';
import { UserAPI } from '../../api';

export const SessionCheck = () => {
	useEffect(() => {
		(async () => {
			try {
				await UserAPI.Auth.session();
			} catch {
				await UserAPI.Auth.logout();
			}
		})();
	}, []);

	return <></>;
};
