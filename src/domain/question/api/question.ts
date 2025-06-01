import { instance } from '~/shared/api/instance';

export const getToday = () => instance.get('question/today').json();
