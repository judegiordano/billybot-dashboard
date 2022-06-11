import { useState } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import { ClientConnectionStatus, IServer } from "btbot-types";

import { config, errorHandler, nextBackend, storage } from "@utils";
import { useAuthStore } from "./useAuth";

export type UseGuilds = {
	guildsCache: IServer[] | null
	updateGuildsCache: (g: IServer[]) => void
	clearGuildsCache: () => void
}

export const useGuildsStore = create<UseGuilds>(
	persist(
		(set, get) => ({
			guildsCache: null,
			updateGuildsCache: (updates: IServer[]) => {
				const { guildsCache } = get();
				set({ guildsCache: { ...guildsCache, ...updates } });
			},
			clearGuildsCache: () => set({ guildsCache: null })
		}),
		{
			name: `${config.NEXT_PUBLIC_STORE}.auth-guilds`,
			getStorage: storage.storageEngine,
			version: 1
		}
	)
);

export function useGuilds() {
	const { authCache } = useAuthStore();
	const { updateGuildsCache } = useGuildsStore();
	const [loading, setLoading] = useState<boolean>(true);

	async function fetcher<T>(key: string) {
		try {
			setLoading(true);
			if (authCache?.connection_status === ClientConnectionStatus.disconnected) {
				return;
			}
			const data = await nextBackend.get<T>(key);
			return data;
		} catch (error) {
			setLoading(false);
			errorHandler(error);
		}
	}

	const { data, error } = useSWR("clients/guilds", () => fetcher<IServer[]>("clients/guilds"), {
		refreshInterval: 60_000,
		onSuccess: data => {
			updateGuildsCache(data as IServer[]);
			setLoading(false);
		},
		onError: () => {
			setLoading(false);
		}
	});
	return {
		loading,
		data,
		error
	};
}
