/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import toast from "react-hot-toast";
import { ClientConnectionStatus, IServer } from "btbot-types";

import { storageEngine } from "@store/engine";
import { nextBackend } from "@utils";
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
			updateGuildsCache: (guildsCache: IServer[]) => set({ guildsCache }),
			clearGuildsCache: () => set({ guildsCache: null })
		}),
		{
			name: "boytown-dashboard.auth-guilds",
			getStorage: storageEngine,
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
			toast.error(error as string);
			setLoading(false);
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
