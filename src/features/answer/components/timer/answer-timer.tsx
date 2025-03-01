import * as stylex from '@stylexjs/stylex';
import { useQuestionTimer } from '~/features/question/hooks/useQuestionTimer';
import { Icon } from '~/images';
import { colors, flex, typo } from '~/style/common.stylex';

export const AnswerTimer = () => {
	const { formattedTime } = useQuestionTimer();
	const { seconds, hours, minutes } = formattedTime;

	return (
		<div {...stylex.props(styles.wrap, flex.vertical)}>
			<Icon.Clock size='14' />

			<span
				{...stylex.props(
					styles.primaryText,
					typo['Body/Body3_14∙100_SemiBold'],
				)}>
				{hours} : {minutes} : {seconds}
			</span>
		</div>
	);
};

const styles = stylex.create({
	wrap: {
		padding: '2px',
		gap: '4px',
		backgroundColor: colors.secondary,
		borderRadius: '4px',
	},
	primaryText: {
		color: colors.main,
	},
});
