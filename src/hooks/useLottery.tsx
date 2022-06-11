import create from "zustand";
import { persist } from "zustand/middleware";

import type { ILotteryInfo } from "@types";
import { useApi } from "./useApi";
import { config, storage } from "@utils";

export type UseLottery = {
	lotteryCache: ILotteryInfo | null
	updateLotteryCache: (l: ILotteryInfo) => void
	clearLotteryCache: () => void
}

export const useLotteryStore = create<UseLottery>(
	persist(
		(set, get) => ({
			lotteryCache: null,
			updateLotteryCache: (updates: ILotteryInfo) => {
				const { lotteryCache } = get();
				set({ lotteryCache: { ...lotteryCache, ...updates } });
			},
			clearLotteryCache: () => set({ lotteryCache: null })
		}),
		{
			name: `${config.NEXT_PUBLIC_STORE}.lottery`,
			getStorage: storage.storageEngine,
			version: 1
		}
	)
);

export const useLottery = (key: string) => {
	const url = `lottery/server/${key}`;
	const { clearLotteryCache, lotteryCache, updateLotteryCache } = useLotteryStore();
	const { data, setLoading, error, loading } = useApi<ILotteryInfo>(url, {
		onSuccess: data => updateLotteryCache(data as ILotteryInfo)
	});
	return {
		data,
		error,
		loading,
		setLoading,
		lotteryCache,
		clearLotteryCache
	};
};
