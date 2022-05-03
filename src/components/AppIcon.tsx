import React from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import VerifiedIcon from "@mui/icons-material/Verified";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const AppIcon = ({
	type,
	color,
	size = "small"
}: {
	type: "verified" | "money" | "ticket",
	color: string,
	size?: "large" | "medium" | "small"
}) => {
	switch (type) {
	case "verified":
		return <VerifiedIcon fontSize={size} style={{ color }} />;
	case "money":
		return <AttachMoneyIcon fontSize={size} style={{ color }} />;
	case "ticket":
		return <ConfirmationNumberIcon fontSize={size} style={{ color }} />;
	default:
		return null;
	}
};
