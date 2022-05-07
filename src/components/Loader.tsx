import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface ILoaderProps {
	visible?: boolean
	size?: number
}

export const Loader = ({
	visible = true,
	size = 50
}: ILoaderProps) => {
	if(!visible) return null;
	return (
		<div className="min-h-screen px-2 py-3 pt-10 m-auto text-center">
			<CircularProgress size={size} />
		</div>
	);
};
