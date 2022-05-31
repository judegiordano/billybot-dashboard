/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "btbot-types";

import { storageEngine } from "@store/engine";
import { useApi } from "./useApi";

export type UserPagination = {
	pages: number,
	users: IUser[]
}

export type UseUsers = {
	userCache: UserPagination
	updateUserCache: (u: UserPagination) => void
	clearUserCache: () => void
}

export const useUsersStore = create<UseUsers>(
	persist(
		(set, get) => ({
			userCache: { pages: 0, users: [] },
			updateUserCache: (userCache: UserPagination) => set({ userCache }),
			clearUserCache: () => set({ userCache: { pages: 0, users: [] } })
		}),
		{
			name: "boytown-dashboard.users",
			getStorage: storageEngine,
			version: 1
		}
	)
);

export const useUsers = (key: string) => {
	const url = `users/server/${key}`;
	const { updateUserCache, userCache, clearUserCache } = useUsersStore();
	const { data, setLoading, error, loading } = useApi<UserPagination>(url, {
		onSuccess: data => updateUserCache(data as UserPagination)
	});
	return {
		data,
		error,
		loading,
		setLoading,
		userCache,
		clearUserCache
	};
};
