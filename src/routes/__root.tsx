import {
	Outlet,
	ScrollRestoration,
	createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Fragment } from 'react';
import { RootLayout } from '~/components/layout/RootLayout';
import { enableMapSet } from 'immer';
import { QueryClient } from '@tanstack/react-query';

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
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
