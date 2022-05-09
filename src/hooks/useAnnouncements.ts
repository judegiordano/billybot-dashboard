import { useSWRConfig } from "swr";

import { useApi } from "./useApi";
import type { IAnnouncement } from "@types";
import { useAnnouncementsStore } from "@store/useAnnouncements";

export function useAnnouncements(key: string) {
	const { mutate } = useSWRConfig();
	const { announcementsCache, updateAnnouncementsCache } = useAnnouncementsStore();
	const { data, isLoading, error } = useApi<IAnnouncement[]>(`announcements/server/${key}`, {
		refreshInterval: 10000,
		onSuccess: (data) => updateAnnouncementsCache(data)
	});
	return {
		data,
		announcementsCache,
		isLoading,
		mutate,
		error
	};
}
