import * as styleX from '@stylexjs/stylex';
import { useLocation } from '@tanstack/react-router';
import { Icon, Image } from '~/images';
import { colors, flex } from '~/style/common.stylex';

export const Header = () => {
	const pathname = useLocation({
		select: location => location.pathname,
	});

	const isQuestionPath = pathname.includes('question');

	return (
		<header {...styleX.props(styles.wrap, flex.between, flex.vertical)}>
			<Image.Logo width='74px' height='23px' />

			<div {...styleX.props(styles.buttonGroup, flex.vertical)}>
				<Icon.Moon size='24' color={colors.gray70} />
				{isQuestionPath && <Icon.Share size='24' color={colors.gray70} />}
				<Icon.Home size='24' color={colors.gray70} />
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
});
