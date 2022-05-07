import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import { useServerStore } from "@store/useServer";
import type { ILotteryInfo } from "@types";
import { Loader } from "@components/Loader";
import { EmptyDataState } from "@components/EmptyDataState";
import { ShallowUser } from "./ShallowUser";
import { constants } from "@utils";

export const LotterySection = () => {
	const { serverCache } = useServerStore();
	const [lottery, setLottery] = useState<ILotteryInfo | undefined>();

	useEffect(() => {
		serverCache && setLottery(serverCache.lottery);
	}, [serverCache]);

	if (!lottery) return <Loader />;
	if (lottery.entrants.length <= 0) return <EmptyDataState text="no entrants yet" />;
	return (
		<>
			<Card
				className="mt-5 font-medium"
				style={{ backgroundColor: constants.THEME.BLACK }}>
				<CardContent>
					<div className="text-[20px] font-extrabold text-theme-gray">
						jackpot
						<div className="inline-flex pl-1 text-theme-green">
							+{lottery.jackpot}
						</div>
					</div>
				</CardContent>
			</Card>
			<Divider className="mt-4 mb-2" style={{ backgroundColor: constants.THEME.GRAY }} />
			{
				lottery.entrants.map((user, key) => <ShallowUser key={key} user={user} />)
			}
		</>
	);
};
