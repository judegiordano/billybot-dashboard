import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import type { IServer } from "btbot-types";

import { AppLink } from "@components/AppLink";
import { config } from "@utils";
import { Separator } from "@components/Separator";

interface IGuildsViewProps {
	server: IServer
}

export const GuildsView = ({ server }: IGuildsViewProps) => {
	return (
		<div className="pt-5 font-bold text-left font-content">
			<div className="inline-flex pr-2 align-middle">
				<Tooltip title={server.server_id}>
					<Avatar
						sx={{ width: 56, height: 56 }}
						alt={server.name}
						src={`https://cdn.discordapp.com/icons/${server.server_id}/${server.icon_hash}.png`}
					/>
				</Tooltip>
			</div>
			<AppLink href={`${config.NEXT_PUBLIC_DOMAIN}/user/server/${server.server_id}`} >
				{server.name}
			</AppLink>
			<div className="pt-2">
				<Separator />
			</div>
		</div>
	);
};
