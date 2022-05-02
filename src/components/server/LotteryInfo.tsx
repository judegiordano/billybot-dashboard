import React from "react";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { ILotteryInfo } from "@types";

export const LotteryInfo = ({ lottery }: { lottery: ILotteryInfo }) => {
	return (
		<div className="pt-2 text-gray-400 font-content">
			<Accordion className="max-w-[400px]" style={{ backgroundColor: "#202225" }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon className="text-gray-400" />} >
					<div className="font-bold text-gray-400 font-content">Lottery</div>
				</AccordionSummary>
				<Divider style={{ backgroundColor: "lightgray" }} />
				<AccordionDetails>
					<div className="font-bold text-gray-400 font-content">
						lottery entrants: {lottery.entrants_count}
					</div>
					<div className="font-bold text-gray-400 font-content">
						lottery ticket cost: <span className="text-green-500">{lottery.ticket_cost}</span>
					</div>
					<div className="font-bold text-gray-400 font-content">
						current lottery jackpot: <span className="text-green-500">{lottery.jackpot}</span>
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
