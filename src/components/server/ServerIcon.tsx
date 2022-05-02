import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

export const ServerIcon = ({
	server_id,
	icon_hash,
	name
}: { server_id: string, icon_hash: string, name: string }) => {
	return (
		<div className="inline-flex pr-2 align-middle">
			<Tooltip title={server_id}>
				<IconButton>
					<Avatar
						sx={{ width: 56, height: 56 }}
						alt={name}
						src={`https://cdn.discordapp.com/icons/${server_id}/${icon_hash}.png`}
					/>
				</IconButton>
			</Tooltip>
		</div>
	);
};
