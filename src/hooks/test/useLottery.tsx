/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import toast from "react-hot-toast";

import { storageEngine } from "@store/engine";
import { backendApi } from "@utils";
import type { ILotteryInfo } from "@types";

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
	const [loading, setLoading] = useState<boolean>(true);
	const { clearLotteryCache, lotteryCache, updateLotteryCache } = useLotteryStore();

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
	const { data, error } = useSWR(url, () => fetcher<ILotteryInfo>(url), {
		refreshInterval: 10_000,
		onSuccess: data => {
			updateLotteryCache(data as ILotteryInfo);
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
		lotteryCache,
		clearLotteryCache
	};
};
