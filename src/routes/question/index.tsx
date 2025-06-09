import { createFileRoute, Link } from '@tanstack/react-router';
import * as stylex from '@stylexjs/stylex';
import { TodayQuestion } from '~/domain/question/components/today';
import { QuestionBlurLayout } from '~/shared/components/layout/question/question-blur-layout';
import { colors, flex, typo } from '~/shared/style/common.stylex';
import { Icon } from '~/shared/images';
import { useQuestionTimer } from '~/domain/question/hooks/useQuestionTimer';
import { Button } from '~/shared/components/ui/button/button';
import { useQuery } from '@tanstack/react-query';
import { todayQuestionInfoOptions } from '~/domain/question/hooks/today/todayQuestionOptions';
import { useTodayQuestion } from '~/domain/question/hooks/useTodayQuestion';
import { Banner } from '~/domain/banner/components/Banner';
import useModal from '~/shared/hooks/useModal';
import { ArticleModal } from '~/domain/question/components/modal/article-modal';
import { useEffect } from 'react';

export const Route = createFileRoute('/question/')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(todayQuestionInfoOptions),
});

function RouteComponent() {
	const { formattedTime } = useQuestionTimer();
	const { data: todayQuestionInfo } = useQuery(todayQuestionInfoOptions);
	const { data: questionData } = useTodayQuestion(
		todayQuestionInfo?.questionId,
	);
	const ArticlePortal = useModal('article-portal');

	const { seconds, hours, minutes } = formattedTime;

	const onClickOpenArticleModal = () => ArticlePortal.open();

	useEffect(() => {
		const updateWidth = () => {
			const width = Math.min(window.innerWidth, 600);
			document.documentElement.style.setProperty('--modal-width', `${width}px`);
		};

		updateWidth();
		window.addEventListener('resize', updateWidth);
		return () => window.removeEventListener('resize', updateWidth);
	}, []);

	useEffect(() => {
		return () => ArticlePortal.clear();
	}, []);

	return (
		<QuestionBlurLayout>
			<Banner />
			<section {...stylex.props(styles.content)}>
				<div {...stylex.props(styles.shadow)} />

				<TodayQuestion
					title={questionData?.question?.title ?? ''}
					subText={questionData?.question?.subText ?? ''}
				/>

				<div
					className='quill'
					style={{
						height: '126px',
						overflow: 'hidden',
						position: 'relative',
						zIndex: 1,
					}}>
					<div
						className='ql-container ql-snow'
						style={{
							border: 0,
							position: 'relative',
							zIndex: -1,
							opacity: 0.6,
						}}>
						<div
							{...stylex.props(styles.articlePreview)}
							dangerouslySetInnerHTML={{
								__html: questionData?.question.article as string,
							}}
						/>
					</div>
				</div>

				<div {...stylex.props(styles.bottom, flex.column)}>
					<div
						{...stylex.props(
							styles.articlePreviewWrap,
							flex.center,
							flex.vertical,
						)}>
						<p
							{...stylex.props(
								styles.articlePreviewText,
								typo['Caption/Caption1_13∙100_SemiBold'],
							)}
							onClick={onClickOpenArticleModal}>
							👀 아티클 확인하기 &gt;
						</p>
					</div>
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

				<ArticlePortal.Render unmountClearAll animationType='fade'>
					<ArticleModal
						onClickClose={ArticlePortal.close}
						article={questionData?.question.article as string}
					/>
				</ArticlePortal.Render>
			</section>
		</QuestionBlurLayout>
	);
}

const styles = stylex.create({
	shadow: {
		marginBottom: 4,
	},
	bannerImage: {},
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
		backgroundColor: colors.gray20,
		display: 'flex',
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
	topBannerImage: {
		borderRadius: 14,
		width: '100%',
		height: 114,
	},
	articlePreview: {
		height: 126,
		zIndex: 99,
	},
	articlePreviewWrap: {
		position: 'relative',
		width: '100%',
		zIndex: 99,
	},
	articlePreviewText: {
		position: 'absolute',
		top: '-80px',
		color: colors.main,
		cursor: 'pointer',
	},
});
