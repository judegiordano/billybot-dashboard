import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";

export const ScrollToTop = () => {
	return (
		<div className="fixed z-[1] bottom-5 right-5 bg-gray-400 h-[45px] w-[45px] inline-grid rounded-[40px] opacity-50">
			<IconButton aria-label="scrollTop" onClick={() => window["scrollTo"]({top: 0, behavior: "smooth"})} style={{padding: "0"}}>
				<ArrowUpwardIcon />
			</IconButton>
		</div>
	);
};
