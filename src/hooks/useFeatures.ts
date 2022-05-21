import { useSWRConfig } from "swr";

import { useApi } from "./useApi";
import { FeaturePagination, useFeaturesStore } from "@store/useFeatures";

export function useFeatures(key: string) {
	const { mutate } = useSWRConfig();
	const { featuresCache, updateFeaturesCache } = useFeaturesStore();
	const { data, isLoading, error } = useApi<FeaturePagination>(`features/server/${key}`, {
		refreshInterval: 10000,
		onSuccess: (data) => updateFeaturesCache(data)
	});
	return {
		data,
		featuresCache,
		isLoading,
		mutate,
		error
	};
}
