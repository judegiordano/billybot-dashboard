/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";

import { storageEngine } from "./engine";
import { IServerMetadata } from "@types";

type UseServer = {
	serverCache: IServerMetadata
	updateServerCache: (t: IServerMetadata) => void
	clearServerCache: () => void
}

export const useServerStore = create<UseServer>(
	persist(
		(set, get) => ({
			serverCache: {} as IServerMetadata,
			updateServerCache: (serverCache: IServerMetadata) => set({ serverCache }),
			clearServerCache: () => set({ serverCache: {} as IServerMetadata })
		}),
		{
			name: "boytown-dashboard.server",
			getStorage: storageEngine,
			version: 1
		}
	)
);
