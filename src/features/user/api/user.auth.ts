import { instance } from '~/api/instance';
import { AuthSchema } from '../schema/user.auth';

export const register = async (data: AuthSchema) =>
	await instance
		.post('user/auth/register', {
			json: data,
		})
		.json();

export const login = async (data: AuthSchema) =>
	await instance
		.post('user/auth/login', {
			json: data,
		})
		.json();

export const session = async () =>
	await instance.get('user/auth/session').json();

export const logout = async () => await instance.get('user/auth/logout').json();
