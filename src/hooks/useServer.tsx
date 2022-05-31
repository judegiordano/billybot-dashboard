import create from "zustand";
import { persist } from "zustand/middleware";

import { storageEngine } from "@store/engine";
import type { IServerInfo } from "@types";
import { useApi } from "./useApi";

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
	const { serverInfoCache, updateServerInfoCache, clearServerInfoCache } = useServerInfoStore();
	const { data, setLoading, error, loading } = useApi<IServerInfo>(url, {
		onSuccess: data => updateServerInfoCache(data as IServerInfo)
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
