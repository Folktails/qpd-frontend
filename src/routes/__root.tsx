import {
	Outlet,
	ScrollRestoration,
	createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Fragment } from 'react';
import { RootLayout } from '~/components/layout/RootLayout';
import { enableMapSet } from 'immer';

export const Route = createRootRoute({
	component: RootComponent,
});

enableMapSet();

function RootComponent() {
	return (
		<Fragment>
			<RootLayout>
				<Outlet />
			</RootLayout>
			<TanStackRouterDevtools position='bottom-right' />
			<ScrollRestoration />
		</Fragment>
	);
}
