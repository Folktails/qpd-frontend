import ky from 'ky';
import { config } from '~/config';

export const instance = ky.create({
	prefixUrl: config.server.host,
	timeout: 5000,
	credentials: 'include',
});
