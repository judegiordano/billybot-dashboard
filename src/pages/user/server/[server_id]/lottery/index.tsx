import React, { useEffect, useState } from "react";
import type { GetServerSidePropsContext } from "next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { config, constants } from "@utils";
import { useLottery } from "@hooks/useLottery";
import type { ILotteryInfo } from "@types";
import { Separator } from "@components/Separator";
import { ShallowUser } from "@components/lottery/ShallowUser";
import { AuthGate } from "@components/auth/AuthGate";
import { ScrollToTop } from "@components/ScrollToTop";
import { BackButton } from "@components/BackButton";

const index = ({ server_id }: { server_id: string }) => {
	const { data } = useLottery(server_id);
	const [lottery, setLottery] = useState<ILotteryInfo>();

	useEffect(() => {
		setLottery(data);
	}, [data]);

	return (
		<AuthGate>
			<div className="min-h-screen m-auto max-w-[750px] mr-auto text-theme-gray">
				<BackButton server_id={server_id} />
				<Card
					className="mt-5 mb-5 font-medium"
					style={{ backgroundColor: constants.THEME.BLACK }}>
					<CardContent>
						<div className="font-bold text-[20px] text-theme-gray font-content">
							lottery entrants: {lottery?.entrants_count}
						</div>
						<div className="font-bold text-[20px] text-theme-gray font-content">
							lottery ticket cost: <span className="text-theme-green">{lottery?.ticket_cost}</span>
						</div>
						<div className="font-bold text-[20px] text-theme-gray font-content">
							base lottery jackpot: <span className="text-theme-green">{lottery?.base_lottery_jackpot}</span>
						</div>
						<div className="font-bold text-[20px] text-theme-gray font-content">
							current lottery jackpot: <span className="text-theme-green">+{lottery?.jackpot}</span>
						</div>
					</CardContent>
				</Card>
				<Separator />
				{
					lottery?.entrants.map((user, key) => <ShallowUser key={key} user={user} />)
				}
			</div>
			<ScrollToTop />
		</AuthGate>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	if (!context.query.server_id) {
		return {
			redirect: {
				destination: `${config.NEXT_PUBLIC_DOMAIN}/`,
				permanent: false,
			},
		};
	}
	return {
		props: {
			server_id: context.query.server_id
		}
	};
}

export default index;
