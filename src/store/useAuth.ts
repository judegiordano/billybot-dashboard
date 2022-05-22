/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";

import { storageEngine } from "./engine";

export type Auth = {
	access_token: string | null
	refresh_token: string | null
	expires_in: number | null
	scope: string | null
	token_type: "Bearer" | null
	id: string | null
	username: string | null
	avatar: string | null
	avatar_decoration: string | null
	discriminator: string | null
	public_flags: number | null
	flags: number | null
	banner: string | null
	banner_color: string | null
	accent_color: number | null
	locale: string | null
	mfa_enabled: boolean | null
}

type UseAuth = {
	authCache: Auth
	updateAuthCache: (a: Partial<Auth>) => void
	clearAuthCache: () => void
}

export const useAuthStore = create<UseAuth>(
	persist(
		(set, get) => ({
			authCache: {
				access_token: null,
				refresh_token: null,
				expires_in: null,
				scope: null,
				token_type: null,
				id: null,
				username: null,
				avatar: null,
				avatar_decoration: null,
				discriminator: null,
				public_flags: null,
				flags: null,
				banner: null,
				banner_color: null,
				accent_color: null,
				locale: null,
				mfa_enabled: null
			},
			updateAuthCache: (updates: Partial<Auth>) => {
				const { authCache } = get();
				set({ authCache: { ...authCache, ...updates } });
			},
			clearAuthCache: () => set({
				authCache: {
					access_token: null,
					refresh_token: null,
					expires_in: null,
					scope: null,
					token_type: null,
					id: null,
					username: null,
					avatar: null,
					avatar_decoration: null,
					discriminator: null,
					public_flags: null,
					flags: null,
					banner: null,
					banner_color: null,
					accent_color: null,
					locale: null,
					mfa_enabled: null
				}
			})
		}),
		{
			name: "boytown-dashboard.auth",
			getStorage: storageEngine,
			version: 1
		}
	)
);
