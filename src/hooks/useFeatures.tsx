/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";
import type { IFeature } from "btbot-types";

import { storageEngine } from "@store/engine";
import { useApi } from "./useApi";

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
			updateFeaturesCache: (featuresCache: FeaturePagination) => set({ featuresCache }),
			clearFeatureCache: () => set({ featuresCache: { pages: 0, features: [] } })
		}),
		{
			name: "boytown-dashboard.features",
			getStorage: storageEngine,
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
