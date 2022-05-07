import { useSWRConfig } from "swr";

import { useServerStore } from "@store/useServer";
import { IServerMetadata } from "@types";
import { useApi } from "./useApi";

export function useServer(id: string) {
	const { mutate } = useSWRConfig();
	const { serverCache, updateServerCache } = useServerStore();
	const { data, isLoading, error } = useApi<IServerMetadata>(`server/${id}`, {
		refreshInterval: 10000,
		// onError: (error, key) => {
		// 	console.log(error);
		// 	toast.error(error.toString());
		// 	if (serverCache._id) {
		// 		return mutate(key, serverCache, false);
		// 	}
		// 	throw new Error(error.toString());
		// },
		onSuccess: (data) => updateServerCache(data)
	});
	return {
		data,
		serverCache,
		isLoading,
		mutate,
		error
	};
}
