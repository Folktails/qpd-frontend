import {
	Outlet,
	ScrollRestoration,
	createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Fragment } from 'react';
import { RootLayout } from '~/shared/components/layout/RootLayout';
import { enableMapSet } from 'immer';
import { QueryClient } from '@tanstack/react-query';
import { config } from '~/config';

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
});

enableMapSet();

function RootComponent() {
	window.Kakao?.init(config.kakao);

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
