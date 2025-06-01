import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '~/shared/style/reset.css';
import '~/shared/style/stylex.css';
import { SessionCheck } from './domain/user/components/auth/Session';

const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	context: {
		queryClient,
	},
	defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<QueryClientProvider client={queryClient}>
			<SessionCheck />
			<RouterProvider router={router} />
		</QueryClientProvider>,
	);
}
