import * as stylex from '@stylexjs/stylex';
import { UseModalReturn } from '~/shared/hooks/useModal';
import { colors } from '~/shared/style/common.stylex';

interface Props {
	modal: UseModalReturn;
	text: string;
	onClickConfirm?: () => void;
}

const styles = stylex.create({
	wrap: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '340px',
		height: '196px',
		padding: '45px 12px 14px',
		backgroundColor: '#fff',
		borderRadius: '20px',
	},

	modalTextWrap: {
		display: 'flex',
		flexDirection: 'column',
		gap: '2px',
		justifyContent: 'center',
		whiteSpace: 'pre',
	},

	modalText: {
		fontSize: '14px',
		fontWeight: 600,
		color: colors.gray90,
		textAlign: 'center',
	},

	buttonWrap: {
		display: 'flex',
		gap: '11px',
		alignItems: 'center',
		width: '100%',
	},

	confirmButton: {
		width: '100%',
		height: '50px',
		color: '#fff',
		backgroundColor: colors.main,
		borderRadius: '14px',
		border: 'none',
		cursor: 'pointer',
	},
});

export const AlertModal = (props: Props) => {
	const { modal, text, onClickConfirm } = props;

	const onClickConfirmButton = () => {
		if (onClickConfirm && typeof onClickConfirm === 'function') {
			onClickConfirm();
		}
		modal.close();
	};

	return (
		<div {...stylex.props(styles.wrap)}>
			<div {...stylex.props(styles.modalTextWrap)}>
				<p {...stylex.props(styles.modalText)}>{text}</p>
			</div>
			<div {...stylex.props(styles.buttonWrap)}>
				<button
					{...stylex.props(styles.confirmButton)}
					onClick={onClickConfirmButton}>
					확인
				</button>
			</div>
		</div>
	);
};
