import { useEffect, useState } from 'react';
import { UTDate } from '~/shared/utils/date';

export const useQuestionTimer = () => {
	const [timeLeft, setTimeLeft] = useState<number>(0);

	useEffect(() => {
		const utDate = new UTDate(new Date());
		const totalSeconds = utDate.getHoursByDay() * 3600;

		const calculateTimeLeft = () => {
			const now = new Date();
			const midnight = new Date(now);
			midnight.setHours(24, 0, 0, 0);

			const secondsUntilMidnight = (midnight.getTime() - now.getTime()) / 1000;
			return Math.max(0, Math.min(totalSeconds, secondsUntilMidnight));
		};

		setTimeLeft(calculateTimeLeft());

		const timer = setInterval(() => {
			const newTimeLeft = calculateTimeLeft();
			setTimeLeft(newTimeLeft);

			if (newTimeLeft === 0) {
				clearInterval(timer);
			}
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const padZero = (num: number) => num.toString().padStart(2, '0');

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = Math.floor(seconds % 60);

		return {
			hours: padZero(hours),
			minutes: padZero(minutes),
			seconds: padZero(secs),
		};
	};

	return { timeLeft, formattedTime: formatTime(timeLeft) };
};
