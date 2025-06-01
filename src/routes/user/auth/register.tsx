import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { produce } from 'immer';
import { ChangeEventHandler, useState } from 'react';
import { useRegister } from '~/domain/user/hooks/mutation/useRegister';
import { colors, flex } from '~/shared/style/common.stylex';

export const Route = createFileRoute('/user/auth/register')({
	component: RouteComponent,
});

function RouteComponent() {
	const { mutate } = useRegister();
	const [input, setInput] = useState({
		email: '',
		password: '',
		nickname: '',
	});

	const onChangeInput: ChangeEventHandler<HTMLInputElement> = e =>
		setInput(
			produce(draft => {
				draft[e.target.name as keyof typeof draft] = e.target.value;
			}),
		);

	return (
		<section {...stylex.props(styles.base, flex.column)}>
			<input name='email' onChange={onChangeInput} value={input.email} />
			<input
				name='password'
				onChange={onChangeInput}
				value={input.password}
				type='password'
			/>
			<input name='nickname' onChange={onChangeInput} value={input.nickname} />

			<button onClick={() => mutate(input)}>회원가입</button>
		</section>
	);
}

const styles = stylex.create({
	base: {
		gap: 16,
	},
	button: {
		color: colors.main,
	},
});
