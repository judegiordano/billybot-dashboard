/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import toast from "react-hot-toast";
import type { IAnnouncement } from "btbot-types";

import { storageEngine } from "@store/engine";
import { backendApi } from "@utils";

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

export const useAnnouncements = (key: string) => {
	const url = `announcements/server/${key}`;
	const [loading, setLoading] = useState<boolean>(true);
	const { announcementsCache, updateAnnouncementsCache, clearAnnouncementCache } = useAnnouncementsStore();

	async function fetcher<T>(url: string) {
		try {
			setLoading(true);
			const data = await backendApi.get<T>(url);
			return data;
		} catch (error) {
			toast.error(error as string);
			setLoading(false);
		}
	}
	const { data, error } = useSWR(url, () => fetcher<AnnouncementPagination>(url), {
		refreshInterval: 10_000,
		onSuccess: data => {
			updateAnnouncementsCache(data as AnnouncementPagination);
			setLoading(false);
		},
		onError: () => {
			setLoading(false);
		}
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
