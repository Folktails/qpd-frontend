import { instance } from '~/api/instance';

export const getToday = () => instance.get('question/today').json();
