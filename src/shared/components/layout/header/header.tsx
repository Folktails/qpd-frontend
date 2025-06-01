import * as styleX from '@stylexjs/stylex';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';
import { Icon, Image } from '~/shared/images';
import { colors, flex } from '~/shared/style/common.stylex';

export const Header = () => {
	const navigate = useNavigate();

	const pathname = useLocation({
		select: location => location.pathname,
	});

	const isQuestionPath = pathname.includes('question');

	const onClickRoute = () => navigate({ to: '/' });
	const onClickMyPage = () => navigate({ to: '/user' });

	return (
		<header {...styleX.props(styles.wrap, flex.between, flex.vertical)}>
			<button onClick={onClickRoute}>
				<Image.Logo width='74px' height='23px' />
			</button>

			<div {...styleX.props(styles.buttonGroup, flex.vertical)}>
				<Icon.Moon size='24' color={colors.gray70} />
				{isQuestionPath && (
					<Fragment>
						<Icon.Share size='24' color={colors.gray70} />
						<Icon.Home size='24' color={colors.gray70} />
					</Fragment>
				)}

				{!isQuestionPath && <Icon.User size='24' color={colors.gray70} />}
			</div>
		</header>
	);
};

const styles = styleX.create({
	wrap: {
		width: '100%',
		padding: '10px 18px',
	},
	buttonGroup: {
		gap: '14px',
	},
	iconWrap: {
		display: 'flex',
	},
});
