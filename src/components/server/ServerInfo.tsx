import React from "react";

import type { IServerInfo } from "@types";

export const ServerInfo = ({ server }: { server: IServerInfo }) => {
	const { settings } = server;
	return (
		<div className="pt-2 text-theme-gray font-content">
			<div className="bg-theme-dark-black max-w-[400px] p-5">
				<div className="font-bold text-theme-gray font-content">
					members: {server.user_count}
				</div>
				<div className="font-bold text-theme-gray font-content">
					weekly allowance rate: <span className="text-theme-green">{settings.allowance_rate}</span>
				</div>
				<div className="font-bold text-theme-gray font-content">
					birthday bonus: <span className="text-theme-green">{settings.birthday_bucks}</span>
				</div>
				<div className="font-bold text-theme-gray font-content">
					lottery cost: <span className="text-theme-green">{settings.lottery_cost}</span>
				</div>
				<div className="font-bold text-theme-gray font-content">
					tax rate: <span className="text-theme-green">{settings.tax_rate}</span>
				</div>
				<div className="font-bold text-theme-gray font-content">
					taxes collected: <span className={`text-theme-${server.taxes_collected ? "green" : "red"}`}>{server.taxes_collected.toString()}</span>
				</div>
			</div>
		</div>
	);
};
