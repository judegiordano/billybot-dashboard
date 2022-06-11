import { useState } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import { ClientConnectionStatus, IClient } from "btbot-types";

import { config, errorHandler, nextBackend, storage } from "@utils";

export interface IAuthUser {
	email?: string
	username?: string
	connection_status?: ClientConnectionStatus
	auth_state?: {
		avatar?: string
		discriminator?: string
		user_id?: string
		username?: string
		registered_servers?: string[]
	}
}

export type UseAuthUser = {
	authCache: IAuthUser | null
	updateAuthCache: (u: Partial<IAuthUser>) => void
	clearAuthCache: () => void
}

export const useAuthStore = create<UseAuthUser>(
	persist(
		(set, get) => ({
			authCache: { connection_status: ClientConnectionStatus.disconnected },
			updateAuthCache: (auth: Partial<IAuthUser>) => {
				const { authCache } = get();
				set({ authCache: { ...authCache, ...auth } });
			},
			clearAuthCache: () => set({ authCache: null })
		}),
		{
			name: `${config.NEXT_PUBLIC_STORE}.auth-user`,
			getStorage: storage.storageEngine,
			version: 1
		}
	)
);

export function useAuth() {
	const { authCache, updateAuthCache } = useAuthStore();
	const [loading, setLoading] = useState<boolean>(true);

	async function fetcher(key: string) {
		try {
			setLoading(true);
			if (authCache?.connection_status === ClientConnectionStatus.disconnected) {
				console.log("no client connected");
				return;
			}
			const client = await nextBackend.post<IClient>(key);
			updateAuthCache({ ...authCache, ...client });
		} catch (error) {
			errorHandler(error);
		}
	}

	const { data, error } = useSWR("clients/refresh/client", () => fetcher("clients/refresh/client"), {
		refreshInterval: 60_000,
		onSuccess: () => setLoading(false),
		onError: () => setLoading(false)
	});
	return {
		data,
		loading,
		authCache,
		error
	};
}
