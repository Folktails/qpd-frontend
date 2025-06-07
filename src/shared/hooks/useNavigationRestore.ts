/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	useRouter,
	type ParsedLocation,
	type RegisteredRouter,
} from '@tanstack/react-router';

export const useNavigationRestore = () => {
	const router = useRouter();

	const restoreNavigation = (): boolean => {
		const storedState = getStoredNavigationState();

		if (storedState) {
			console.log('🔄 저장된 위치로 복원:', storedState);

			console.log(storedState);

			// Type-safe 네비게이션
			router.navigate({
				to: storedState.pathname,
				search: storedState.search as any,
				hash: storedState.hash,
				replace: true,
			});

			// 복원 후 상태 제거
			clearNavigationState();
			return true;
		}

		return false;
	};

	return { restoreNavigation };
};

type AllPaths = RegisteredRouter['routeTree']['_fullPath']['all'];

export interface StoredNavigationState {
	pathname: AllPaths;

	search: Record<string, any>;
	hash: string;
	timestamp: number;
}

// utils/navigation.ts
const NAVIGATION_STATE_KEY = 'pending_navigation_state';

export const saveNavigationState = (location: ParsedLocation): void => {
	const navigationState: StoredNavigationState = {
		pathname: location.pathname as AllPaths,
		search: location.search,
		hash: location.hash,
		timestamp: Date.now(),
	};

	try {
		localStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(navigationState));
		console.log('📍 네비게이션 상태 저장:', navigationState);
	} catch (error) {
		console.warn('네비게이션 상태 저장 실패:', error);
	}
};

export const getStoredNavigationState = (): StoredNavigationState | null => {
	try {
		const stored = localStorage.getItem(NAVIGATION_STATE_KEY);
		if (!stored) return null;

		const navigationState = JSON.parse(stored) as StoredNavigationState;

		// 1시간 이상 된 상태는 무효화
		const ONE_HOUR = 60 * 60 * 1000;
		if (Date.now() - navigationState.timestamp > ONE_HOUR) {
			localStorage.removeItem(NAVIGATION_STATE_KEY);
			return null;
		}

		return navigationState;
	} catch (error) {
		console.warn('네비게이션 상태 복원 실패:', error);
		localStorage.removeItem(NAVIGATION_STATE_KEY);
		return null;
	}
};

export const clearNavigationState = (): void => {
	localStorage.removeItem(NAVIGATION_STATE_KEY);
};

// 안전한 경로 검증
const SAFE_REDIRECT_PATHS: ReadonlyArray<string> = [
	'/',
	'/user/profile',
	'/user/settings',
	'/dashboard',
	// 허용할 리다이렉트 경로들 추가
] as const;

export const isSafeRedirectPath = (path: string): boolean => {
	return (
		SAFE_REDIRECT_PATHS.includes(path) ||
		path.startsWith('/user/') ||
		path.startsWith('/dashboard/')
	);
};
