import { useSWRConfig } from "swr";

import type { IServer } from "@types";
import { useApi } from "./useApi";
import { useServerInfoStore } from "@store/useServerInfo";

export function useServer(key: string) {
	const { mutate } = useSWRConfig();
	const { serverInfoCache, updateServerInfoCache } = useServerInfoStore();
	const { data, isLoading, error } = useApi<IServer>(`server/information/${key}`, {
		refreshInterval: 10000,
		onSuccess: (data) => updateServerInfoCache(data)
	});
	return {
		data,
		serverInfoCache,
		isLoading,
		mutate,
		error
	};
}
