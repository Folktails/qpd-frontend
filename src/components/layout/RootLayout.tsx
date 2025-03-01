import * as stylex from '@stylexjs/stylex';
import { PropsWithChildren } from 'react';
import { flex } from '~/style/common.stylex';
import { Header } from './header/header';

export const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<main {...stylex.props(styles.wrap, flex.horizontal)}>
			<section {...stylex.props(styles.inner)}>
				<Header />

				{children}
			</section>
		</main>
	);
};

const styles = stylex.create({
	wrap: {
		// width: '100vw',
		height: '100svh',
	},
	inner: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		maxWidth: 600,
	},
});
