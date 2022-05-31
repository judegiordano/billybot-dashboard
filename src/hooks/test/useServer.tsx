import { useState } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import toast from "react-hot-toast";

import { storageEngine } from "@store/engine";
import { backendApi } from "@utils";
import type { IServerInfo } from "@types";

export type UseServerInfo = {
	serverInfoCache: Partial<IServerInfo> | null
	updateServerInfoCache: (s: Partial<IServerInfo> | null) => void
	clearServerInfoCache: () => void
}

export const useServerInfoStore = create<UseServerInfo>(
	persist(
		(set, get) => ({
			serverInfoCache: null,
			updateServerInfoCache: (update: Partial<IServerInfo> | null) => {
				const { serverInfoCache } = get();
				set({ serverInfoCache: { ...serverInfoCache, ...update } });
			},
			clearServerInfoCache: () => set({ serverInfoCache: null })
		}),
		{
			name: "boytown-dashboard.server-info",
			getStorage: storageEngine,
			version: 1
		}
	)
);

export const useServer = (key: string) => {
	const url = `server/information/${key}`;
	const [loading, setLoading] = useState<boolean>(true);
	const { serverInfoCache, updateServerInfoCache, clearServerInfoCache } = useServerInfoStore();

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
	const { data, error } = useSWR(url, () => fetcher<IServerInfo>(url), {
		refreshInterval: 10_000,
		onSuccess: data => {
			updateServerInfoCache(data as IServerInfo);
			setLoading(false);
		},
		onError: () => {
			updateServerInfoCache(null);
			setLoading(false);
		}
	});

	return {
		data,
		error,
		loading,
		setLoading,
		serverInfoCache,
		clearServerInfoCache
	};
};
