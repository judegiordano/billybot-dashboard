import React from "react";
import Divider from "@mui/material/Divider";

export const ServerInfo = ({
	member_count,
	allowance_rate
}: {
	member_count: number
	allowance_rate: number
}) => {
	return (
		<div className="pt-2 text-theme-gray font-content">
			<div className="bg-theme-dark-black max-w-[400px] p-5">
				<div className="font-bold text-theme-gray font-content">Server Information</div>
				<Divider style={{ backgroundColor: "lightgray" }} />
				<div className="font-bold text-theme-gray font-content">
					members: {member_count}
				</div>
				<div className="font-bold text-theme-gray font-content">
					weekly allowance rate: <span className="text-theme-green">{allowance_rate}</span>
				</div>
			</div>
		</div>
	);
};
