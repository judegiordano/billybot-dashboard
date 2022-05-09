/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";

import { storageEngine } from "./engine";
import type { IServer, IUser } from "@types";

type UseServerInfo = {
	serverInfoCache: IServer | null
	updateServerInfoCache: (u: IServer) => void
	clearServerInfoCache: () => void
}

export const useServerInfoStore = create<UseServerInfo>(
	persist(
		(set, get) => ({
			serverInfoCache: null,
			updateServerInfoCache: (serverInfoCache) => set({ serverInfoCache }),
			clearServerInfoCache: () => set({ serverInfoCache: null })
		}),
		{
			name: "boytown-dashboard.server-info",
			getStorage: storageEngine,
			version: 1
		}
	)
);
