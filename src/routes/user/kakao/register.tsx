import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user/kakao/register')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/user/kakao/register"!</div>;
}
