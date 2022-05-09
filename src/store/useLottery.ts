/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";

import { storageEngine } from "./engine";
import type { ILotteryInfo } from "@types";

type UseLottery = {
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
