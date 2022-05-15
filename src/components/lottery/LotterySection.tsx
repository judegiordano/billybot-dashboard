import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import type { ILotteryInfo } from "@types";
import { Loader } from "@components/Loader";
import { EmptyDataState } from "@components/EmptyDataState";
import { ShallowUser } from "./ShallowUser";
import { constants } from "@utils";
import { useLottery } from "@hooks/useLottery";
import { Separator } from "@components/Separator";

export const LotterySection = () => {
	const { query } = useRouter();
	const { data } = useLottery(query.server_id as string);
	const [lottery, setLottery] = useState<ILotteryInfo | undefined>();

	useEffect(() => {
		data && setLottery(data);
	}, [data]);

	if (!lottery) return <Loader />;
	if (lottery.entrants.length <= 0) return <EmptyDataState text="no entrants yet" />;
	return (
		<>
			<Card
				className="mt-5 mb-5 font-medium"
				style={{ backgroundColor: constants.THEME.BLACK }}>
				<CardContent>
					<div className="font-bold text-[20px] text-theme-gray font-content">
						lottery entrants: {lottery.entrants_count}
					</div>
					<div className="font-bold text-[20px] text-theme-gray font-content">
						lottery ticket cost: <span className="text-theme-green">{lottery.ticket_cost}</span>
					</div>
					<div className="font-bold text-[20px] text-theme-gray font-content">
						base lottery jackpot: <span className="text-theme-green">{lottery.base_lottery_jackpot}</span>
					</div>
					<div className="font-bold text-[20px] text-theme-gray font-content">
						current lottery jackpot: <span className="text-theme-green">+{lottery.jackpot}</span>
					</div>
				</CardContent>
			</Card>
			<Separator />
			{
				lottery.entrants.map((user, key) => <ShallowUser key={key} user={user} />)
			}
		</>
	);
};
