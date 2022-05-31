/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import useSWR from "swr";
import type { IClient } from "btbot-types";

import { nextBackend } from "@utils";
import { ClientConnectionStatus } from "@types";
import { storageEngine } from "@store/engine";

export interface IAuthUser {
	email?: string
	username?: string
	connection_status?: ClientConnectionStatus
	auth_state?: {
		avatar?: string
		discriminator?: string
		user_id?: string
		username?: string
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
			name: "boytown-dashboard.auth-user",
			getStorage: storageEngine,
			version: 1
		}
	)
);

export function useAuth() {
	const { authCache, updateAuthCache } = useAuthStore();

	async function fetcher(key: string) {
		try {
			if (authCache?.connection_status === ClientConnectionStatus.disconnected) {
				console.log("no client connected");
				return;
			}
			const data = await nextBackend.post<IClient>(`oauth/${key}`);
			updateAuthCache({
				...authCache,
				email: data.email,
				username: data.username,
				auth_state: {
					user_id: data?.auth_state?.user_id,
					username: data?.auth_state?.username,
					discriminator: data?.auth_state?.discriminator,
					avatar: data?.auth_state?.avatar
				}
			});
		} catch (error) {
			toast.error(error as string);
		}
	}
	const { data, error } = useSWR("refresh", () => fetcher("refresh"), {
		refreshInterval: 60_000
	});
	return {
		isLoading: data == null && !error,
		authCache,
		error
	};
}
