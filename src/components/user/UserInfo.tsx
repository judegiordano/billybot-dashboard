import React from "react";
import Tooltip from "@mui/material/Tooltip";

import type { IUser } from "@types";

const buildBuckColor = (bucks: number) => {
	if (bucks >= 501) return "text-theme-green";
	if (bucks <= 500 && bucks >= 301) return "text-theme-yellow";
	return "text-theme-red";
};

export const UserInfo = ({ user }: { user: IUser }) => {
	return (
		<>
			<Tooltip title={`${user.username}#${user.discriminator}`}>
				<div
					className="inline-flex text-[20px] font-extrabold text-theme-gray font-content">
					{user.username}
				</div>
			</Tooltip>
			<Tooltip title={`${user.username} has ${user.billy_bucks} BillyBucks`}>
				<div className={`inline-flex pl-1 text-[20px] font-medium font-content ${buildBuckColor(user.billy_bucks)}`}>
					{user.billy_bucks}
				</div>
			</Tooltip>
		</>
	);
};
