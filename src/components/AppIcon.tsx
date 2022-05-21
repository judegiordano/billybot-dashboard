import React from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import VerifiedIcon from "@mui/icons-material/Verified";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const AppIcon = ({
	type,
	color,
	size = "small"
}: {
	type: "verified" | "money" | "ticket" | "crown" | "jester",
	color?: string,
	size?: "large" | "medium" | "small"
}) => {
	switch (type) {
	case "verified":
		return <VerifiedIcon fontSize={size} style={{ color }} />;
	case "money":
		return <AttachMoneyIcon fontSize={size} style={{ color }} />;
	case "ticket":
		return <ConfirmationNumberIcon fontSize={size} style={{ color }} />;
	case "crown":
		return <img src="/crown.svg" height={20} width={20}/>;
	case "jester":
		return <img src="/jester.svg" height={20} width={20}/>;
	default:
		return null;
	}
};
