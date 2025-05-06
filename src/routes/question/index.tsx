import { createFileRoute, Link } from '@tanstack/react-router';
import * as stylex from '@stylexjs/stylex';
import { TodayQuestion } from '~/features/question/components/today';
import { QuestionBlurLayout } from '~/components/layout/question/question-blur-layout';
import { colors, flex, typo } from '~/style/common.stylex';
import { Icon } from '~/images';
import { useQuestionTimer } from '~/features/question/hooks/useQuestionTimer';
import { Button } from '~/components/ui/button/button';
import { todayQuestionOptions } from '~/features/question/hooks/today/todayQuestionOptions';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/question/')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(todayQuestionOptions),
});

function RouteComponent() {
	const { formattedTime } = useQuestionTimer();
	const { data } = useQuery(todayQuestionOptions);

	console.log(data, 'data');

	const { seconds, hours, minutes } = formattedTime;

	return (
		<QuestionBlurLayout>
			<section {...stylex.props(styles.content)}>
				<div {...stylex.props(styles.shadow)} />
				<TodayQuestion text={text} />

				<div {...stylex.props(styles.bottom, flex.column)}>
					<div {...stylex.props(styles.banner, flex.column)}>
						<div {...stylex.props(styles.timer, flex.vertical)}>
							<Icon.Clock size='20' />

							<span
								{...stylex.props(
									styles.time,
									typo['Heading/H3_20∙100_SemiBold'],
								)}>
								{hours} : {minutes} : {seconds}
							</span>
						</div>

						<p
							{...stylex.props(
								styles.guide,
								typo['Caption/Caption1_13∙100_Regular'],
							)}>
							<span {...stylex.props(styles.blueSpan)}>24시간</span> 동안만 답을
							보낼 수 있어요!
						</p>
					</div>

					<Link to='/question/write' search={{ step: 1 }} style={{ zIndex: 1 }}>
						<Button variants='primary'>답변 작성하기</Button>
					</Link>
				</div>
			</section>
		</QuestionBlurLayout>
	);
}

const text =
	'꿈의 힘을 믿고, 사고 파는 사람들도 있어요. 여러분의 꿈도 현실에 영향을 준 적이 있나요?';

const styles = stylex.create({
	shadow: {
		marginBottom: 4,
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: 'calc(100% - 44px)',
		flex: 1,
	},
	banner: {
		width: '100%',
		height: 70,
		borderRadius: 14,
		border: `1px solid ${colors.main}`,
		backgroundColor: '#fff',
		zIndex: 1,
		padding: 12,
		gap: 12,
	},
	timer: {
		gap: 8,
	},
	time: {
		color: colors.main,
	},
	blueSpan: {
		color: colors.main,
	},
	guide: {
		color: colors.gray80,
	},
	bottom: {
		gap: 24,
	},
});
