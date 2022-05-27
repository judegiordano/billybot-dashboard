import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import type { IServer } from "btbot-types";

import { AppLink } from "@components/AppLink";
import { config } from "@utils";
import { Separator } from "@components/Separator";

interface IGuildsViewProps {
	guild: IServer
}

export const GuildsView: React.FC<IGuildsViewProps> = ({
	guild
}: IGuildsViewProps): JSX.Element => {
	return (
		<div className="pt-5 font-bold text-left font-content">
			<div className="inline-flex pr-2 align-middle">
				<Tooltip title={guild.server_id}>
					<Avatar
						sx={{ width: 56, height: 56 }}
						alt={guild.name}
						src={`https://cdn.discordapp.com/icons/${guild.server_id}/${guild.icon_hash}.png`}
					/>
				</Tooltip>
			</div>
			<AppLink
				target="_blank"
				href={`${config.NEXT_PUBLIC_DOMAIN}/user/server/${guild.server_id}`}
			>
				{guild.name}
			</AppLink>
			<div className="pt-2">
				<Separator />
			</div>
		</div>
	);
};
