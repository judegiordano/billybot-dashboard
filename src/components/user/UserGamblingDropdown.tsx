import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardSuit, ICard, IGamblingMetrics } from "btbot-types";

import { constants } from "@utils";
import { Separator } from "@components/Separator";

const suitLookup: Record<CardSuit, string> = {
	[CardSuit.clubs]: "♣️",
	[CardSuit.hearts]: "♥️",
	[CardSuit.spades]: "♠️",
	[CardSuit.diamonds]: "♦️"
};
const valueLookup: Record<number, string> = {
	1: "A",
	2: "2",
	3: "3",
	4: "4",
	5: "5",
	6: "6",
	7: "7",
	8: "8",
	9: "9",
	10: "10",
	11: "J",
	12: "Q",
	13: "K"
};
const colorLookup: Record<CardSuit, string> = {
	[CardSuit.clubs]: "gray",
	[CardSuit.hearts]: "red",
	[CardSuit.spades]: "gray",
	[CardSuit.diamonds]: "red"
};

interface IUserGamblingDropdownProps {
	gambling: IGamblingMetrics
}

const BuildRouletteAverages = ({ roulette }: { roulette: IGamblingMetrics["roulette"] }) => {
	return (
		<>
			{
				roulette.spins > 0 && (
					<div>
						<Separator />
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

const BuildBlackJackAverages = ({ blackjack }: { blackjack: IGamblingMetrics["blackjack"] }) => {
	return (
		<>
			{
				blackjack.games > 0 && (
					<div>
						<Separator />
						<div className="text-sm font-bold text-theme-gray">
							average win rate: <span
								className="text-theme-green"
							>
								%{((blackjack.wins / blackjack.games) * 100).toFixed(2)}
							</span>
						</div>
						<div className="text-sm font-bold text-theme-gray">
							average loss rate: <span
								className="text-theme-red"
							>
								%{((blackjack.losses / blackjack.games) * 100).toFixed(2)}
							</span>
						</div>
						<div className="text-sm font-bold text-theme-gray">
							average bet: <span
								className="text-theme-green"
							>
								{(((blackjack.overall_winnings + blackjack.overall_losings) / blackjack.games)).toFixed(2)}
							</span>
						</div>
					</div>
				)
			}
		</>
	);
};

const BuildLastHand = ({ hand }: { hand?: ICard[] }) => {
	return (
		<>
			<div className="inline-flex">
				{
					hand ? hand.map((card, key) => (
						<>
							<div className="inline-flex pr-1" key={key}>
								<span className={`text-theme-${colorLookup[card.suit]}`}>
									{valueLookup[card.value]}
								</span>
								<span className={`text-theme-${colorLookup[card.suit]}`}>
									{suitLookup[card.suit]}
								</span>
							</div>
						</>
					)) : <div>N/A</div>
				}
			</div>
		</>
	);
};

const BuildConnectFourAverages = ({ connect_four }: { connect_four: IGamblingMetrics["connect_four"] }) => {
	return (
		<>
			{
				connect_four.games > 0 && (
					<div>
						<Separator />
						<div className="text-sm font-bold text-theme-gray">
							average win rate: <span
								className="text-theme-green"
							>
								%{((connect_four.wins / connect_four.games) * 100).toFixed(2)}
							</span>
						</div>
						<div className="text-sm font-bold text-theme-gray">
							average loss rate: <span
								className="text-theme-red"
							>
								%{((connect_four.losses / connect_four.games) * 100).toFixed(2)}
							</span>
						</div>
						<div className="text-sm font-bold text-theme-gray">
							average draw rate: <span
								className="text-theme-red"
							>
								%{((connect_four.draws / connect_four.games) * 100).toFixed(2)}
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
	const { roulette, blackjack, connect_four } = gambling;
	return (
		<div className="pt-2 text-theme-gray">
			<Accordion className="max-w-[400px]" style={{ backgroundColor: constants.THEME.DARK_BLACK }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon className="text-theme-gray" />} >
					<div className="text-sm font-bold text-theme-gray">Gambling Metrics</div>
				</AccordionSummary>
				<Separator />
				<AccordionDetails>
					<Accordion className="max-w-[400px]" style={{ backgroundColor: constants.THEME.DARK_BLACK }}>
						<AccordionSummary expandIcon={<ExpandMoreIcon className="text-theme-gray" />} >
							<div className="text-theme-gray">
								blackjack
							</div>
						</AccordionSummary>
						<Separator />
						<AccordionDetails>
							{
								Object.keys(blackjack).map((key, index) => (
									<div key={index} className="text-sm font-bold text-theme-gray">
										{key.replace(/_/gmi, " ")}: <span className={`text-theme-${/los/gmi.test(key) ? "red" : "green"}`}>
											{key === "last_hand" ? <BuildLastHand hand={blackjack.last_hand?.hand} /> : blackjack[key as keyof typeof blackjack]}
										</span>
									</div>
								))
							}
							<BuildBlackJackAverages blackjack={gambling.blackjack} />
						</AccordionDetails>
					</Accordion>
					{/* break metrics */}
					<Separator />
					{/* end */}
					<Accordion className="max-w-[400px]" style={{ backgroundColor: constants.THEME.DARK_BLACK }}>
						<AccordionSummary expandIcon={<ExpandMoreIcon className="text-theme-gray" />} >
							<div className="text-theme-gray">
								roulette
							</div>
						</AccordionSummary>
						<Separator />
						<AccordionDetails>
							{
								Object.keys(roulette).map((key, index) => (
									<div key={index} className="text-sm font-bold text-theme-gray">
										{key.replace(/_/gmi, " ")}: <span
											className={`text-theme-${/los/gmi.test(key) ? "red" : "green"}`}
										>
											{roulette[key as keyof typeof roulette]}
										</span>
									</div>
								))
							}
							<BuildRouletteAverages roulette={gambling.roulette} />
						</AccordionDetails>
					</Accordion>
					<Separator />
					<Accordion className="max-w-[400px]" style={{ backgroundColor: constants.THEME.DARK_BLACK }}>
						<AccordionSummary expandIcon={<ExpandMoreIcon className="text-theme-gray" />} >
							<div className="text-theme-gray">
								connect four
							</div>
						</AccordionSummary>
						<Separator />
						<AccordionDetails>
							{
								Object.keys(connect_four).map((key, index) => (
									<div key={index} className="text-sm font-bold text-theme-gray">
										{key.replace(/_/gmi, " ")}: <span
											className={`text-theme-${/los/gmi.test(key) ? "red" : "green"}`}
										>
											{connect_four[key as keyof typeof connect_four]}
										</span>
									</div>
								))
							}
							<BuildConnectFourAverages connect_four={gambling.connect_four} />
						</AccordionDetails>
					</Accordion>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
