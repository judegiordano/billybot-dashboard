/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import toast from "react-hot-toast";
import type { IUser } from "btbot-types";

import { storageEngine } from "@store/engine";
import { backendApi } from "@utils";

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
	const [loading, setLoading] = useState<boolean>(true);
	const { updateUserCache, userCache, clearUserCache } = useUsersStore();

	async function fetcher<T>(url: string) {
		try {
			setLoading(true);
			const data = await backendApi.get<T>(url);
			return data;
		} catch (error) {
			toast.error(error as string);
			setLoading(false);
		}
	}
	const { data, error } = useSWR(url, () => fetcher<UserPagination>(url), {
		refreshInterval: 10_000,
		onSuccess: data => {
			updateUserCache(data as UserPagination);
			setLoading(false);
		},
		onError: () => {
			setLoading(false);
		}
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
