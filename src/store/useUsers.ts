/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";

import { storageEngine } from "./engine";
import type { IUser } from "@types";

export type UserPagination = {
	pages: number,
	users: IUser[]
}

type UseUsers = {
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
