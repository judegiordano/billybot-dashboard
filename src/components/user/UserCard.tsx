import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import type { IUser } from "@types";
import { readableDate, readableTime } from "@utils";
import { UserAvatar } from "./UserAvatar";
import { Badge } from "@components/Badge";
import { UserInfo } from "./UserInfo";

interface IUserCardProps {
	user: IUser
	index: number
}

export const UserCard = ({ user, index }: IUserCardProps) => {
	const badges = [
		{ show: user.is_admin, tooltip: `${user.username} is a bot administrator`, icon: "bot_admin" },
		{ show: index < 3, tooltip: `${user.username} is a server noblemen`, icon: "crown" },
		{ show: user.has_lottery_ticket, tooltip: `${user.username} has purchased this weeks lottery ticket`, icon: "lottery_ticket" }
	];
	return (
		<Card className="mt-5" id={`${user.username}-${user.discriminator}`} style={{ backgroundColor: "#2f3136" }}>
			<CardContent>
				<div>
					<UserAvatar user={user} />
					<UserInfo user={user} />
				</div>
				{
					badges.map((data, key) =>
						<Badge key={key} icon={data.icon} show={data.show} tooltip={data.tooltip} />
					)
				}
				<Divider style={{ backgroundColor: "lightgray" }} className="max-w-[400px]" />
				<div className="pt-2 font-medium text-gray-400 font-content">
					<div>
						last allowance: {readableDate(user.last_allowance)}: {readableTime(user.last_allowance)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
