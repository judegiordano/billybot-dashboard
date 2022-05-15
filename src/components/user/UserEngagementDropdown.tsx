import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { IEngagementMetrics } from "@types";
import { constants } from "@utils";
import { Separator } from "@components/Separator";

interface IUserEngagementDropdownProps {
	engagement: IEngagementMetrics
}

export const UserEngagementDropdown: React.FC<IUserEngagementDropdownProps> = ({
	engagement
}: IUserEngagementDropdownProps): JSX.Element => {
	return (
		<div className="pt-2 text-theme-gray">
			<Accordion className="max-w-[400px]" style={{ backgroundColor: constants.THEME.DARK_BLACK }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon className="text-theme-gray" />} >
					<div className="text-sm font-bold text-theme-gray">Engagement Metrics</div>
				</AccordionSummary>
				<Separator />
				<AccordionDetails>
					{
						Object.keys(engagement).map((key, index) => (
							<div key={index} className="text-sm font-bold text-theme-gray">
								{key.replace(/_/gmi, " ")}: <span className="text-theme-green">
									{engagement[key as keyof typeof engagement]}
								</span>
							</div>
						))
					}
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
