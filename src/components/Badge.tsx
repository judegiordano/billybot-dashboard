import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

interface IBadgeProps {
	show: boolean
	tooltip: string
	icon: string
}

export const Badge = ({ show, tooltip, icon }: IBadgeProps) => {
	if (!show) return null;
	return (
		<div className="inline-flex pb-2 align-middle">
			<Tooltip title={tooltip}>
				<IconButton>
					<Avatar
						sx={{ width: 20, height: 20 }}
						alt={icon}
						src={`/${icon}.png`}
					/>
				</IconButton>
			</Tooltip>
		</div>
	);
};
