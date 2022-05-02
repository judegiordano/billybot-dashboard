import React from "react";
import Tooltip from "@mui/material/Tooltip";

import type { IUser } from "@types";

const buildBuckColor = (bucks: number) => {
	if (bucks >= 501) return "text-green-500";
	if (bucks <= 500 && bucks >= 301) return "text-yellow-500";
	return "text-red-500";
};

export const UserInfo = ({ user }: { user: IUser }) => {
	return (
		<>
			<div
				className="inline-flex text-2xl font-extrabold text-gray-400 font-content">
				{user.username}
			</div>
			<div className="inline-flex pl-1 font-medium text-gray-400 font-content">#{user.discriminator}</div>
			<Tooltip title={`${user.username} has ${user.billy_bucks} BillyBucks`}>
				<div className={`inline-flex pl-1 text-2xl font-medium font-content ${buildBuckColor(user.billy_bucks)}`}>
					{user.billy_bucks}
				</div>
			</Tooltip>
		</>
	);
};
