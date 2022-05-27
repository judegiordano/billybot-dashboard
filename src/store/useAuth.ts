/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";

import { storageEngine } from "./engine";
import { ClientConnectionStatus } from "@types";

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
type UseAuthUser = {
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
