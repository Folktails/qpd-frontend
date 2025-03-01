import React, { useEffect, useMemo, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useModalActions, useModalStore } from '~/store/modal';

const BASE_Z_INDEX = 1000; // 고정된 기본 zIndex 값
const currentZIndex = BASE_Z_INDEX;
type AnimationType = 'fade' | 'scale' | 'upDown' | 'right' | 'bottomSheet';
type ModalType = 'modal' | 'snackBar' | 'menu' | 'bottomSheet';

export type UseModalReturn = ReturnType<typeof useModal>;

interface PortalProps {
	children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
	const element =
		typeof window !== 'undefined' && document.getElementById('modal');

	return element && children ? createPortal(children, element) : null;
};

const fade = stylex.keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const scale = stylex.keyframes({
	'0%': {
		transform: 'translate(-50%, -50%) scale(0)',
		opacity: 0,
	},
	'100%': {
		transform: 'translate(-50%, -50%) scale(1)',
		opacity: 1,
	},
});

const upDown = stylex.keyframes({
	'0%': {
		transform: 'translate(-50%, 200%)',
		opacity: 0,
	},
	'100%': {
		transform: 'translate(-50%, -50%)',
		opacity: 1,
	},
});

const right = stylex.keyframes({
	'0%': { opacity: 0 },
	'100%': {
		right: 0,
		opacity: 1,
	},
});

const bottomSheet = stylex.keyframes({
	'0%': {
		transform: 'translate(-50%, 200%)',
		opacity: 0,
	},
	'100%': {
		transform: 'translate(-50%, 0%)',
		opacity: 1,
	},
});

const animations = stylex.create({
	scale: {
		animationName: scale,
		animationDuration: '0.4s',
	},
	upDown: {
		animationName: upDown,
		animationDuration: '0.4s',
	},
	right: {
		animationName: right,
		animationDuration: '0.4s',
	},
	bottomSheet: {
		animationName: bottomSheet,
		animationDuration: '0.4s',
	},
	fade: {
		animationName: fade,
		animationDuration: '0.4s',
	},
});

const modalPosition = stylex.create({
	modal: {
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	snackBar: {
		width: '100%',
		top: 'unset',
		bottom: '90px',
		left: '50%',
		transform: 'translateX(-50%)',
	},
	menu: {
		left: 'unset',
		right: '-100%',
		transform: 'translateY(-50%)',
	},
	bottomSheet: {
		top: 'unset',
		bottom: 0,
		left: '50%',
		transform: 'translateX(-50%)',
	},
});

const styles = stylex.create({
	background: (isOpen: boolean) => ({
		cursor: 'pointer',
		position: 'fixed',
		zIndex: isOpen ? currentZIndex : currentZIndex - 1,
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		animationName: fade,
		animationDuration: '300ms',
		animationFillMode: 'forwards',
		animationDirection: isOpen ? '' : 'reverse',
	}),
	modalWrap: (isOpen: boolean, animationType: AnimationType) => ({
		position: 'fixed',
		zIndex: isOpen ? currentZIndex : currentZIndex - 1,
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		animationName: animations[animationType],
		animationDuration: '300ms',
		animationFillMode: 'forwards',
		animationDirection: isOpen ? '' : 'reverse',
	}),
});

export const useModal = (modalKey: string) => {
	const { modalSet } = useModalStore();
	const { modalOpen, modalClose, modalClear } = useModalActions();
	const isOpen = modalSet.has(modalKey);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (isOpen === isActive) return;
		(async () => {
			if (!isOpen) {
				await new Promise(resolve => setTimeout(resolve, 350));
			}
			setIsActive(isOpen);
		})();
	}, [isOpen]);

	useEffect(() => {
		const html = document.getElementsByTagName('html')[0];
		if (isActive) {
			html.style.overflow = 'hidden';
		} else {
			html.style.overflow = '';
		}
		return () => {
			html.style.overflow = '';
		};
	}, [isOpen, isActive]);

	const open = () => modalOpen(modalKey);
	const close = () => modalClose(modalKey);

	interface Props {
		children: ReactNode;
		invisibleBackground?: boolean;
		unmountClearAll?: boolean;
		onClickBackground?: () => void;
		animationType?: AnimationType;
		type?: ModalType;
		snackbarDelay?: number;
	}

	const Render = (props: Props) => {
		const {
			children,
			unmountClearAll,
			invisibleBackground,
			onClickBackground,
			animationType = 'upDown',
			type = 'modal',
			snackbarDelay = 2000,
		} = props;
		// snackbar 일경우 자동으로 닫히게
		useEffect(() => {
			if (type !== 'snackBar') return;
			const timer = setTimeout(() => {
				modalClose(modalKey);
			}, snackbarDelay);

			return () => clearTimeout(timer);
		}, []);

		const closeModal = unmountClearAll ? modalClear : close;

		const _onClickBackground = () => {
			if (onClickBackground) {
				onClickBackground();
				return;
			}
			closeModal();
		};

		if (!isActive) return null;

		return (
			<Portal>
				{!invisibleBackground && (
					<div
						{...stylex.props(styles.background(isOpen))}
						onClick={_onClickBackground}
					/>
				)}
				<div
					{...stylex.props(
						styles.modalWrap(isOpen, animationType),
						modalPosition[type],
					)}>
					{children}
				</div>
			</Portal>
		);
	};

	return useMemo(
		() => ({ Render, open, close, clear: modalClear }),
		[isActive, isOpen],
	);
};

export default useModal;
