import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import type { IUser } from "@types";
import { constants, readableDate, readableTime } from "@utils";
import { UserAvatar } from "./UserAvatar";
import { Badge } from "@components/Badge";
import { UserInfo } from "./UserInfo";
import { AppIcon } from "@components/AppIcon";
import { UserGamblingDropdown } from "./UserGamblingDropdown";

interface IUserCardProps {
	user: IUser
	index: number
}

export const UserCard = ({ user, index }: IUserCardProps) => {
	const badges = [
		{
			show: user.is_admin,
			tooltip: `${user.username} is a bot administrator`,
			alt: "admin",
			icon: <AppIcon type="verified" color={constants.THEME.BLUE} />
		},
		{
			show: index < 3,
			tooltip: `${user.username} is a server noblemen`,
			alt: "noblemen",
			icon: <AppIcon type="money" color={constants.THEME.GREEN} />
		},
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
				<Divider style={{ backgroundColor: constants.THEME.GRAY }} className="max-w-[400px]" />
				<UserGamblingDropdown metrics={user.metrics} />
				<div className="pt-2 font-medium text-theme-gray font-content">
					<div>
						last allowance: {readableDate(user.last_allowance)}: {readableTime(user.last_allowance)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
