import create from "zustand";
import { persist } from "zustand/middleware";
import type { IAnnouncement } from "btbot-types";

import { useApi } from "./useApi";
import { config, storage } from "@utils";

export type AnnouncementPagination = {
	pages: number,
	announcements: IAnnouncement[]
}

export type UseAnnouncements = {
	announcementsCache: AnnouncementPagination
	updateAnnouncementsCache: (a: AnnouncementPagination) => void
	clearAnnouncementCache: () => void
}

export const useAnnouncementsStore = create<UseAnnouncements>(
	persist(
		(set, get) => ({
			announcementsCache: { pages: 0, announcements: [] },
			updateAnnouncementsCache: (updates: AnnouncementPagination) => {
				const { announcementsCache } = get();
				set({ announcementsCache: { ...announcementsCache, ...updates } });
			},
			clearAnnouncementCache: () => set({ announcementsCache: { pages: 0, announcements: [] } })
		}),
		{
			name: `${config.NEXT_PUBLIC_STORE}.announcements`,
			getStorage: storage.storageEngine,
			version: 1
		}
	)
);

export const useAnnouncements = (key: string) => {
	const url = `announcements/server/${key}`;
	const { announcementsCache, updateAnnouncementsCache, clearAnnouncementCache } = useAnnouncementsStore();
	const { data, setLoading, error, loading } = useApi<AnnouncementPagination>(url, {
		onSuccess: data => updateAnnouncementsCache(data as AnnouncementPagination)
	});
	return {
		data,
		error,
		loading,
		setLoading,
		announcementsCache,
		clearAnnouncementCache
	};
};
