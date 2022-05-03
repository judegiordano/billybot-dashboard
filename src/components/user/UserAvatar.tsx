import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

import { IUser } from "@types";

const buildAvatarUrl = (user: IUser) => {
	if (!user.avatar_hash) return "/default_profile.png";
	return `https://cdn.discordapp.com/avatars/${user.user_id}/${user.avatar_hash}.png`;
};

export const UserAvatar = ({ user }: { user: IUser }) => {
	return (
		<div className="inline-flex align-middle">
			<Tooltip title={user.user_id}>
				<IconButton>
					<Avatar
						sx={{ width: 50, height: 50 }}
						alt={user.username}
						src={buildAvatarUrl(user)}
					/>
				</IconButton>
			</Tooltip>
		</div>
	);
};
