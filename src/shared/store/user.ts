import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Store = {};

const initialStore: Store = {
	modalSet: new Set(),
};
export type Actions = {};

export const useUserStore = create<Store & { actions: Actions }>()(
	immer(set => ({
		...initialStore,
		actions: {},
	})),
);

export const useUserActions = () => useUserStore(s => s.actions);
