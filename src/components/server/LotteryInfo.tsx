import React from "react";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { ILotteryInfo } from "@types";
import { constants } from "@utils";

export const LotteryInfo = ({ lottery }: { lottery: ILotteryInfo }) => {
	return (
		<div className="pt-2 text-theme-gray font-content">
			<Accordion className="max-w-[400px]" style={{ backgroundColor: constants.THEME.DARK_BLACK }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon className="text-theme-gray" />} >
					<div className="font-bold text-theme-gray font-content">Lottery</div>
				</AccordionSummary>
				<Divider style={{ backgroundColor: constants.THEME.GRAY }} />
				<AccordionDetails>
					<div className="font-bold text-theme-gray font-content">
						lottery entrants: {lottery.entrants_count}
					</div>
					<div className="font-bold text-theme-gray font-content">
						lottery ticket cost: <span className="text-theme-green">{lottery.ticket_cost}</span>
					</div>
					<div className="font-bold text-theme-gray font-content">
						current lottery jackpot: <span className="text-theme-green">{lottery.jackpot}</span>
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
