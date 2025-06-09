import * as stylex from '@stylexjs/stylex';
import { colors, flex, typo } from '~/shared/style/common.stylex';
import { Question } from '../../api';

interface Props {
	questionData: Question | undefined;
}

export const AnswerItem = ({ questionData }: Props) => {
	console.log(questionData?.title);

	return (
		<div {...stylex.props(styles.base, flex.column)}>
			<div
				{...stylex.props(styles.questionMarkWrap, flex.between, flex.vertical)}>
				<p
					{...stylex.props(
						typo['Body/Body1_16∙100_SemiBold'],
						styles.mainColor,
					)}>
					Q.
				</p>
			</div>

			<div {...stylex.props(styles.textWrap, flex.column)}>
				<p {...stylex.props(typo['Body/lines/Body3_14∙150_SemiBold_lines'])}>
					{questionData?.title}
				</p>

				<p {...stylex.props(typo['Body/lines/Body3_14∙150_Regular_lines'])}>
					{questionData?.answerList[0].text}
				</p>
			</div>
		</div>
	);
};

const styles = stylex.create({
	base: {
		width: '100%',
		padding: '8px',
		border: `1px solid ${colors.main}`,
		maxHeight: 400,
		borderRadius: 14,
	},
	titleWrap: {
		marginBottom: 4,
	},
	questionMarkWrap: {
		marginBottom: 12,
	},
	textWrap: {
		gap: 8,
	},
	mainColor: {
		color: colors.main,
	},
	gray80: {
		color: colors.gray80,
	},
});
