import * as stylex from '@stylexjs/stylex';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { produce } from 'immer';
import { ChangeEventHandler, useState } from 'react';
import { z } from 'zod';
import { LoginBottomSheet } from '~/shared/components/ui/bottom-sheet/login/login-bottom-sheet';
import { Button } from '~/shared/components/ui/button/button';
import { WarnSnackbar } from '~/shared/components/ui/snackbar/warn';
import { AnswerNicknameStep } from '~/domain/answer/components/write/step/nickname-step';
import { AnswerWriteStep } from '~/domain/answer/components/write/step/write-step';

import useModal from '~/shared/hooks/useModal';
import { todayQuestionInfoOptions } from '~/domain/question/hooks/today/todayQuestionOptions';
import { useQuery } from '@tanstack/react-query';
import { useTodayQuestion } from '~/domain/question/hooks/useTodayQuestion';
import { useUserStore } from '~/domain/user/store';
import { useAddAnswer } from '~/domain/answer/hooks/useAddAnswer';

const Search = z.object({
	step: z.number(),
});

export const Route = createFileRoute('/question/write')({
	component: RouteComponent,
	validateSearch: search => Search.parse(search),
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(todayQuestionInfoOptions),
});

function RouteComponent() {
	const LoginPortal = useModal('login-portal');
	const WarningSnackbar = useModal('answer-warning');
	const { isLogin } = useUserStore();
	const { step } = Route.useSearch() as { step: 1 | 2 };
	const { data: todayQuestionInfo } = useQuery(todayQuestionInfoOptions);
	const { data: questionData } = useTodayQuestion(
		todayQuestionInfo?.questionId,
	);
	const { mutateAsync: addAnswer } = useAddAnswer();

	const navigate = useNavigate({ from: '/question/write' });

	const [form, setForm] = useState({
		text: '',
		nickname: '',
		isShared: true,
	});

	const onChangeTextarea: ChangeEventHandler<HTMLTextAreaElement> = e =>
		setForm(
			produce(draft => {
				draft.text = e.target.value;
			}),
		);

	const onClickWatchAlone = () => {
		if (!isLogin) {
			LoginPortal.open();
			return;
		}

		setForm(
			produce(draft => {
				draft.isShared = !draft.isShared;
			}),
		);
	};

	const onChangeNickname: ChangeEventHandler<HTMLInputElement> = e =>
		setForm(
			produce(draft => {
				draft.nickname = e.target.value;
			}),
		);

	const handleStep1 = () => {
		if (!isLogin) return;
		if (form.text.length >= 200) {
			WarningSnackbar.open();
			return;
		}

		navigate({
			search: prev => ({ ...prev, step: 2 }),
		});
	};

	const handleStep2 = async () => {
		if (!form.text) return;

		await addAnswer({
			questionId: questionData?.question.id ?? 0,
			answer: {
				text: form.text,
				nickname: form.nickname,
				isShared: form.isShared,
			},
		});

		navigate({
			to: '/question/confirm',
		});
	};

	const onClickConfirm = () => {
		const stepHandlers: Record<number, () => void> = {
			1: () => handleStep1(),
			2: () => handleStep2(),
		};
		const stepNumber = step as number;

		stepHandlers[stepNumber]?.();
	};

	const titleMap = {
		1: '작성완료',
		2: '답변 보내기',
	} as const;

	return (
		<section {...stylex.props(styles.wrap)}>
			{step === 1 && (
				<AnswerWriteStep
					onClickWatchAlone={onClickWatchAlone}
					onChangeTextArea={onChangeTextarea}
					question={questionData?.question}
					answer={form.text}
					isShared={form.isShared}
				/>
			)}

			{step === 2 && (
				<AnswerNicknameStep
					onChangeNickname={onChangeNickname}
					nickname={form.nickname}
				/>
			)}

			<div {...stylex.props(styles.buttonWrap)}>
				<Button
					variants='primary'
					disabled={!form.text}
					onClick={onClickConfirm}>
					{titleMap[step]}
				</Button>
			</div>

			<LoginPortal.Render type='bottomSheet' animationType='bottomSheet'>
				<LoginBottomSheet />
			</LoginPortal.Render>

			<WarningSnackbar.Render
				type='snackBar'
				animationType='upDown'
				onClickBackground={() => {}}
				invisibleBackground>
				<WarnSnackbar text='200자 이내로 입력해주세요' />
			</WarningSnackbar.Render>
		</section>
	);
}

const styles = stylex.create({
	wrap: {
		display: 'flex',
		padding: '24px 18px',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		flex: 1,
		maxWidth: 600,
	},
	buttonWrap: {
		marginTop: '45px',
		width: '100%',
	},
});
