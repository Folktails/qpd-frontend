import * as styleX from '@stylexjs/stylex';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useRouter } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';
import { config } from '~/config';
import { todayQuestionInfoOptions } from '~/domain/question/hooks/today/todayQuestionOptions';
import { useTodayQuestion } from '~/domain/question/hooks/useTodayQuestion';
import useModal from '~/shared/hooks/useModal';
import { Icon, Image } from '~/shared/images';
import { colors, flex } from '~/shared/style/common.stylex';
import { LoginBottomSheet } from '../../ui/bottom-sheet/login/login-bottom-sheet';
import { useUserStore } from '~/domain/user/store';

type Variant = 'back';

interface Props {
	variant?: Variant;
	onClickCallback: () => void;
}

export const Header = ({ variant, onClickCallback }: Props) => {
	const navigate = useNavigate();
	const pathname = useLocation({
		select: location => location.pathname,
	});
	const LoginPortal = useModal('login-portal');
	const { isLogin } = useUserStore();
	const router = useRouter();

	const { data: todayQuestionInfo } = useQuery(todayQuestionInfoOptions);
	const { data: questionData } = useTodayQuestion(
		todayQuestionInfo?.questionId,
	);

	const isQuestionPath = pathname.includes('question');
	const onClickRoute = () => navigate({ to: '/' });

	const onClickLogin = () => {
		if (isLogin) return;
		LoginPortal.open();
	};

	const onClickBack = () => {
		router.history.back();

		if (typeof onClickCallback !== 'function') return;
		onClickCallback();
	};

	return (
		<header {...styleX.props(styles.wrap, flex.between, flex.vertical)}>
			{variant === 'back' ? (
				<button onClick={onClickBack}>
					<Icon.ArrowLeft size='20' color={colors.gray90} />
				</button>
			) : (
				<button onClick={onClickRoute}>
					{Boolean(questionData?.question?.logoImageId) ? (
						<img
							width={74}
							height={23}
							src={config.image.host + questionData?.question.logoImageId}
						/>
					) : (
						<Image.Logo width='74px' height='23px' />
					)}
				</button>
			)}

			<div {...styleX.props(styles.buttonGroup, flex.vertical)}>
				{/* <Icon.Moon size='24' color={colors.gray70} /> */}

				{isQuestionPath && (
					<Fragment>
						{/* <Icon.Share size='24' color={colors.gray70} /> */}

						<button
							{...styleX.props(styles.button)}
							onClick={() => navigate({ to: '/' })}>
							<Icon.Home size='24' color={colors.gray70} />
						</button>
					</Fragment>
				)}

				{/* {!isQuestionPath && (
					<button {...styleX.props(styles.button)} onClick={onClickLogin}>
						<Icon.User size='24' color={colors.gray70} />
					</button>
				)} */}
			</div>

			<LoginPortal.Render type='bottomSheet' animationType='bottomSheet'>
				<LoginBottomSheet />
			</LoginPortal.Render>
		</header>
	);
};

const styles = styleX.create({
	wrap: {
		width: '100%',
		padding: '10px 18px',
		backgroundColor: colors.white,
	},
	buttonGroup: {
		gap: '14px',
	},
	iconWrap: {
		display: 'flex',
	},
	button: {
		width: '24px',
		height: '24px',
	},
});
