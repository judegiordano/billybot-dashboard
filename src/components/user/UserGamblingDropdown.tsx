import React from "react";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { IGamblingMetrics } from "@types";
import { constants } from "@utils";

interface IUserGamblingDropdownProps {
	gambling: IGamblingMetrics
}

export const BuildAverages = ({ stats }: { stats: IGamblingMetrics }) => {
	const { roulette } = stats;
	return (
		<>
			{
				roulette.spins > 0 && (
					<div>
						<div className="mt-1 mb-1">
							<Divider style={{ backgroundColor: constants.THEME.GRAY }} />
						</div>
						<div className="text-sm font-bold text-theme-gray">
							average win rate: <span
								className="text-theme-green"
							>
								%{((roulette.wins / roulette.spins) * 100).toFixed(2)}
							</span>
						</div>
						<div className="text-sm font-bold text-theme-gray">
							average loss rate: <span
								className="text-theme-red"
							>
								%{((roulette.losses / roulette.spins) * 100).toFixed(2)}
							</span>
						</div>
						<div className="text-sm font-bold text-theme-gray">
							average bet: <span
								className="text-theme-green"
							>
								{(((roulette.overall_winnings + roulette.overall_losings) / roulette.spins)).toFixed(2)}
							</span>
						</div>
					</div>
				)
			}
		</>
	);
};

export const UserGamblingDropdown: React.FC<IUserGamblingDropdownProps> = ({
	gambling
}: IUserGamblingDropdownProps): JSX.Element => {
	const { roulette } = gambling;
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
					<BuildAverages stats={gambling} />
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
