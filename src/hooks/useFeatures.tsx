import create from "zustand";
import { persist } from "zustand/middleware";
import type { IFeature } from "btbot-types";

import { useApi } from "./useApi";
import { config, storage } from "@utils";

export type FeaturePagination = {
	pages: number,
	features: IFeature[]
}

export type UseFeatures = {
	featuresCache: FeaturePagination
	updateFeaturesCache: (a: FeaturePagination) => void
	clearFeatureCache: () => void
}

export const useFeaturesStore = create<UseFeatures>(
	persist(
		(set, get) => ({
			featuresCache: { pages: 0, features: [] },
			updateFeaturesCache: (updates: FeaturePagination) => {
				const { featuresCache } = get();
				set({ featuresCache: { ...featuresCache, ...updates } });
			},
			clearFeatureCache: () => set({ featuresCache: { pages: 0, features: [] } })
		}),
		{
			name: `${config.NEXT_PUBLIC_STORE}.features`,
			getStorage: storage.storageEngine,
			version: 1
		}
	)
);

export const useFeatures = (key: string) => {
	const url = `features/server/${key}`;
	const { featuresCache, updateFeaturesCache, clearFeatureCache } = useFeaturesStore();
	const { data, setLoading, error, loading } = useApi<FeaturePagination>(url, {
		onSuccess: data => updateFeaturesCache(data as FeaturePagination)
	});
	return {
		data,
		error,
		loading,
		setLoading,
		featuresCache,
		clearFeatureCache
	};
};
