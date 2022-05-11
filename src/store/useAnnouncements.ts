/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";

import { storageEngine } from "./engine";
import type { IAnnouncement } from "@types";

export type AnnouncementPagination = {
	pages: number,
	announcements: IAnnouncement[]
}

type UseAnnouncements = {
	announcementsCache: AnnouncementPagination
	updateAnnouncementsCache: (a: AnnouncementPagination) => void
	clearAnnouncementCache: () => void
}

export const useAnnouncementsStore = create<UseAnnouncements>(
	persist(
		(set, get) => ({
			announcementsCache: { pages: 0, announcements: [] },
			updateAnnouncementsCache: (announcementsCache: AnnouncementPagination) => set({ announcementsCache }),
			clearAnnouncementCache: () => set({ announcementsCache: { pages: 0, announcements: [] } })
		}),
		{
			name: "boytown-dashboard.announcements",
			getStorage: storageEngine,
			version: 1
		}
	)
);
