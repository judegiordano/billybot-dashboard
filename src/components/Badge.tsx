import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

interface IBadgeProps {
	show: boolean
	tooltip: string
	alt: string
	children: React.ReactNode
}

export const Badge = ({ show, tooltip, children }: IBadgeProps) => {
	if (!show) return null;
	return (
		<div className="inline-flex pb-2 align-middle">
			<Tooltip title={tooltip}>
				<IconButton>
					{ children }
				</IconButton>
			</Tooltip>
		</div>
	);
};
