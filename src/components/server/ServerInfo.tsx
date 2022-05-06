import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { IUser } from "@types";
import { ScrollToSection } from "@components/ScrollToSection";
import { constants } from "@utils";
import { useServerStore } from "@store/useServer";

export const ServerInfo = ({
	member_count,
	allowance_rate
}: {
	member_count: number
	allowance_rate: number
}) => {
	const { serverCache } = useServerStore();
	const [mayor, setMayor] = useState<IUser>();

	useEffect(() => {
		const found = serverCache.users.find(({ is_mayor }) => is_mayor === true);
		setMayor(found);
	}, [serverCache]);

	return (
		<div className="pt-2 text-theme-gray font-content">
			<Accordion className="max-w-[400px]" style={{ backgroundColor: constants.THEME.DARK_BLACK }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon className="text-theme-gray" />} >
					<div className="font-bold text-theme-gray font-content">Server Information</div>
				</AccordionSummary>
				<Divider style={{ backgroundColor: "lightgray" }} />
				<AccordionDetails>
					<div className="font-bold text-theme-gray font-content">
						members: {member_count}
					</div>
					<div className="font-bold text-theme-gray font-content">
						weekly allowance rate: <span className="text-theme-green">{allowance_rate}</span>
					</div>
					{
						mayor && (
							<div className="font-bold text-theme-gray font-content">
								current mayor: <ScrollToSection text={mayor.username} id={`${mayor.username}-${mayor.discriminator}`} />
							</div>
						)
					}
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
