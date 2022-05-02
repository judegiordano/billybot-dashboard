import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import type { IServerMetadata } from "@types";
import { useServerStore } from "@store/useServer";
import { ServerIcon } from "./ServerIcon";
import { LotteryInfo } from "./LotteryInfo";
import { ServerInfo } from "./ServerInfo";

export const ServerCard = () => {
	const { serverCache } = useServerStore();
	const [server, setServer] = useState<IServerMetadata>();

	useEffect(() => {
		setServer(serverCache);
	}, [serverCache]);

	if (!server) {
		return (
			<div>loading server info...</div>
		);
	}

	return (
		<>
			<Card className="mt-5" style={{ backgroundColor: "#2f3136" }}>
				<CardContent>
					<div className="pb-2">
						<ServerIcon
							name={server.name}
							server_id={server.server_id}
							icon_hash={server.icon_hash}
						/>
						<div className="inline-flex text-2xl font-extrabold text-gray-400 font-content">
							{server.name}
						</div>
					</div>
					<Divider style={{ backgroundColor: "lightgray" }} className="max-w-[400px]" />
					<ServerInfo
						member_count={server.users.length}
						allowance_rate={server.settings.allowance_rate}
						mayor={server.mayor}
					/>
					<LotteryInfo lottery={server.lottery} />
				</CardContent>
			</Card>
		</>
	);
};
