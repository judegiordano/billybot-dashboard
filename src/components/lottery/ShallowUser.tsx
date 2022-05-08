import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import type { IUser } from "@types";
import { constants } from "@utils";
import { Badge } from "@components/Badge";
import { AppIcon } from "@components/AppIcon";

interface IShallowUserProps {
	user: Pick<IUser, "username">
}

export const ShallowUser: React.FC<IShallowUserProps> = ({
	user
}: IShallowUserProps): JSX.Element => {
	return (
		<Card
			className="mt-5 font-medium"
			style={{ backgroundColor: constants.THEME.BLACK }}
		>
			<CardContent>
				<div className="text-[20px] font-extrabold text-theme-gray">
					{user.username}
					<Badge alt={"ticket"} show={true} tooltip={`${user.username} has purchased a lottery ticket`}>
						<AppIcon type="ticket" color={constants.THEME.RED} />
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
};
