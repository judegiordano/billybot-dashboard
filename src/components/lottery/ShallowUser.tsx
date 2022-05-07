import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import type { IUser } from "@types";
import { constants } from "@utils";

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
				</div>
			</CardContent>
		</Card>
	);
};
