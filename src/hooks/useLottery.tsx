/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";

import { storageEngine } from "@store/engine";
import type { ILotteryInfo } from "@types";
import { useApi } from "./useApi";

export type UseLottery = {
	lotteryCache: ILotteryInfo | null
	updateLotteryCache: (l: ILotteryInfo) => void
	clearLotteryCache: () => void
}

export const useLotteryStore = create<UseLottery>(
	persist(
		(set, get) => ({
			lotteryCache: null,
			updateLotteryCache: (lotteryCache: ILotteryInfo) => set({ lotteryCache }),
			clearLotteryCache: () => set({ lotteryCache: null })
		}),
		{
			name: "boytown-dashboard.lottery",
			getStorage: storageEngine,
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
