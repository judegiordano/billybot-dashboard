import { useSWRConfig } from "swr";

import { useLotteryStore } from "@store/useLottery";
import type { ILotteryInfo } from "@types";
import { useApi } from "./useApi";

export function useLottery(key: string) {
	const { mutate } = useSWRConfig();
	const { lotteryCache, updateLotteryCache } = useLotteryStore();
	const { data, isLoading, error } = useApi<ILotteryInfo>(`lottery/server/${key}`, {
		refreshInterval: 10000,
		onSuccess: (data) => updateLotteryCache(data)
	});
	return {
		data,
		lotteryCache,
		isLoading,
		mutate,
		error
	};
}
