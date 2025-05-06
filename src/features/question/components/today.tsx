import * as stylex from '@stylexjs/stylex';
import { flex, colors, typo } from '~/style/common.stylex';

interface Props {
	text: string;
}

export const TodayQuestion = (props: Props) => {
	const { text } = props;

	return (
		<section {...stylex.props(styles.wrap, flex.column)}>
			<span
				{...stylex.props(
					styles.mark,
					typo['Body/lines/Body1_16∙150_SemiBold_lines'],
				)}
			>
				Q.
			</span>

			<h2
				{...stylex.props(
					styles.title,
					typo['Heading/lines/H1_28∙130_SemiBold_lines'],
				)}
			>
				{'세상에서 감정 하나를' + '\n' + '없앨 수 있다면?'}
			</h2>

			<p
				{...stylex.props(
					styles.text,
					typo['Body/lines/Body3_14∙150_Regular_lines'],
				)}
			>
				{text}
			</p>
		</section>
	);
};

const styles = stylex.create({
	wrap: {
		gap: 12,
		zIndex: 1,
	},
	mark: {
		color: colors.main,
	},
	title: {
		color: colors.gray90,
		whiteSpace: 'pre-line',
		paddingTop: 4,
	},
	text: {
		color: colors.gray80,
		wordBreak: 'break-all',
		width: 250,
	},
	// butti
});
