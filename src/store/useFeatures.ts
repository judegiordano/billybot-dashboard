/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";

import { storageEngine } from "./engine";
import type { IFeature } from "@types";

export type FeaturePagination = {
	pages: number,
	features: IFeature[]
}

type UseFeatures = {
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
