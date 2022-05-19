import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { ILotteryMetrics } from "@types";
import { constants } from "@utils";
import { Separator } from "@components/Separator";

interface IUserLotteryDropdownProps {
	lottery: ILotteryMetrics
}

export const UserLotteryDropdown: React.FC<IUserLotteryDropdownProps> = ({
	lottery
}: IUserLotteryDropdownProps): JSX.Element => {
	return (
		<div className="pt-2 text-theme-gray">
			<Accordion className="max-w-[400px]" style={{ backgroundColor: constants.THEME.DARK_BLACK }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon className="text-theme-gray" />} >
					<div className="text-sm font-bold text-theme-gray">Lottery Metrics</div>
				</AccordionSummary>
				<Separator />
				<AccordionDetails>
					{
						Object.keys(lottery).map((key, index) => (
							<div key={index} className="text-sm font-bold text-theme-gray">
								{key.replace(/_/gmi, " ")}: <span className="text-theme-green">
									{lottery[key as keyof typeof lottery]}
								</span>
							</div>
						))
					}
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
