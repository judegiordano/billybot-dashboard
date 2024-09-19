import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { IUser } from "btbot-types";

import { constants } from "@utils";
import { UserAvatar } from "./UserAvatar";
import { Badge } from "@components/Badge";
import { UserInfo } from "./UserInfo";
import { AppIcon } from "@components/AppIcon";
import { UserGamblingDropdown } from "./UserGamblingDropdown";
import { UserEngagementDropdown } from "./UserEngagementDropdown";
import { Separator } from "@components/Separator";
import { UserLotteryDropdown } from "./UserLotteryDropdown";

interface IUserCardProps {
	user: IUser
}

export const UserCard = ({ user }: IUserCardProps) => {
	const badges = [
		{
			show: user.is_admin,
			tooltip: `${user.username} is a bot administrator`,
			alt: "admin",
			icon: <AppIcon type="verified" color={constants.THEME.BLUE} />
		},
		{
			show: user.is_mayor,
			tooltip: `${user.username} is the Boy Town mayor`,
			alt: "mayor",
			icon: <AppIcon type="crown"/>
		},
		{
			show: user.is_fool,
			tooltip: `${user.username} is the Boy Town fool`,
			alt: "fool",
			icon: <AppIcon type="jester" />
		},
		// {
		// 	show: index < 3,
		// 	tooltip: `${user.username} is a server noblemen`,
		// 	alt: "noblemen",
		// 	icon: <AppIcon type="money" color={constants.THEME.GREEN} />
		// },
		{
			show: user.has_lottery_ticket,
			tooltip: `${user.username} has purchased this weeks lottery ticket`,
			alt: "lottery_ticket",
			icon: <AppIcon type="ticket" color={constants.THEME.RED} />
		}
	];
	return (
		<Card
			className="mt-5"
			id={`${user.username}-${user.discriminator}`}
			style={{ backgroundColor: constants.THEME.BLACK }}
		>
			<CardContent>
				<div>
					<UserAvatar user={user} />
					<UserInfo user={user} />
				</div>
				{
					badges.map((data, key) =>
						<Badge key={key} alt={data.alt} show={data.show} tooltip={data.tooltip}>{data.icon}</Badge>
					)
				}
				<div className="max-w-[400px]">
					<Separator />
					<UserEngagementDropdown engagement={user.metrics.engagement} />
					<UserGamblingDropdown gambling={user.metrics.gambling} />
					<UserLotteryDropdown lottery={user.metrics.lottery} />
					<Separator />
					<div className="pt-2 text-sm font-medium text-theme-gray font-content">
						<div>
							allowance available: <span className={`text-theme-${user.allowance_available ? "green" : "red"}`}>{user.allowance_available.toString()}</span>
						</div>
					</div>
					<div className="pt-2 text-sm font-medium text-theme-gray font-content">
						<div>
							deal or no deal eligible: <span className={`text-theme-${user.is_deal_or_no_deal_eligible ? "green" : "red"}`}>{user.is_deal_or_no_deal_eligible.toString()}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
