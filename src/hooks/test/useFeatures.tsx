/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import toast from "react-hot-toast";
import type { IFeature } from "btbot-types";

import { storageEngine } from "@store/engine";
import { backendApi } from "@utils";

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
	const [loading, setLoading] = useState<boolean>(true);
	const { featuresCache, updateFeaturesCache, clearFeatureCache } = useFeaturesStore();

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
	const { data, error } = useSWR(url, () => fetcher<FeaturePagination>(url), {
		refreshInterval: 10_000,
		onSuccess: data => {
			updateFeaturesCache(data as FeaturePagination);
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
		featuresCache,
		clearFeatureCache
	};
};

