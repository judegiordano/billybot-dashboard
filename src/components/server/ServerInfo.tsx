import React from "react";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { IUser } from "@types";
import { ScrollToSection } from "@components/ScrollToSection";

export const ServerInfo = ({
	member_count,
	allowance_rate,
	mayor
}: {
	member_count: number
	allowance_rate: number
	mayor: IUser
}) => {
	return (
		<div className="pt-2 text-gray-400 font-content">
			<Accordion className="max-w-[400px]" style={{ backgroundColor: "#202225" }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon className="text-gray-400" />} >
					<div className="font-bold text-gray-400 font-content">Server Information</div>
				</AccordionSummary>
				<Divider style={{ backgroundColor: "lightgray" }} />
				<AccordionDetails>
					<div className="font-bold text-gray-400 font-content">
						members: {member_count}
					</div>
					<div className="font-bold text-gray-400 font-content">
						weekly allowance rate: <span className="text-green-500">{allowance_rate}</span>
					</div>
					<div className="font-bold text-gray-400 font-content">
						current mayor: <ScrollToSection text={mayor.username} id={`${mayor.username}-${mayor.discriminator}`} />
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
