import React from "react";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { IUserMetrics } from "@types";
import { constants } from "@utils";

interface IUserGamblingDropdownProps {
	metrics: Pick<IUserMetrics, "gambling">
}

export const UserGamblingDropdown: React.FC<IUserGamblingDropdownProps> = ({
	metrics
}: IUserGamblingDropdownProps): JSX.Element => {
	const { roulette } = metrics.gambling;
	return (
		<div className="pt-2 text-theme-gray">
			<Accordion className="max-w-[400px]" style={{ backgroundColor: constants.THEME.DARK_BLACK }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon className="text-theme-gray" />} >
					<div className="text-sm font-bold text-theme-gray">Gambling Metrics</div>
				</AccordionSummary>
				<Divider style={{ backgroundColor: constants.THEME.GRAY }} />
				<AccordionDetails>
					{
						Object.keys(roulette).map((key, index) => (
							<div key={index} className="text-sm font-bold text-theme-gray">
								roulette {key.replace(/_/gmi, " ")}: <span
									className={`text-theme-${/los/gmi.test(key) ? "red" : "green"}`}
								>
									{roulette[key as keyof typeof roulette]}
								</span>
							</div>
						))
					}
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
