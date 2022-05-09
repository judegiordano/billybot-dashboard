/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";

import { storageEngine } from "./engine";
import type { IAnnouncement } from "@types";

type UseAnnouncements = {
	announcementsCache: IAnnouncement[]
	updateAnnouncementsCache: (a: IAnnouncement[]) => void
	clearAnnouncementCache: () => void
}

export const useAnnouncementsStore = create<UseAnnouncements>(
	persist(
		(set, get) => ({
			announcementsCache: [],
			updateAnnouncementsCache: (announcementsCache: IAnnouncement[]) => set({ announcementsCache }),
			clearAnnouncementCache: () => set({ announcementsCache: [] })
		}),
		{
			name: "boytown-dashboard.announcements",
			getStorage: storageEngine,
			version: 1
		}
	)
);
