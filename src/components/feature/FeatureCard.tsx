import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { FeatureStatus, IFeature } from "@types";
import { constants, readableDate, readableTime } from "@utils";
import { Separator } from "@components/Separator";

interface IFeatureCardProps {
	feature: IFeature
}

const Timestamp = ({ date }: { date: Date }) => {
	return (
		<div className="text-[11px] italic text-theme-gray">
			<div className="inline-flex pr-1 font-bold align-middle">
				{
					readableDate(new Date(date).toISOString())
				}
			</div>
			:
			<div className="inline-flex pl-1 font-bold align-middle">
				{
					readableTime(new Date(date).toISOString())
				}
			</div>
		</div>
	);
};

const PosterInfo = ({ feature }: { feature: IFeature }) => {
	return (
		<div className="inline-flex pr-1 text-theme-gray">
			Suggested By - {feature.user.username}
		</div>
	);
};

const statusColorLookup: Record<FeatureStatus, string> = { 
	[FeatureStatus.pending] : "theme-yellow",
	[FeatureStatus.completed] : "theme-green", 
	[FeatureStatus.rejected] : "theme-red",
	[FeatureStatus.in_progress]: "theme-yellow"
};

const PendingStatus = ({ feature }: { feature: IFeature }) => {
	return (
		<div className="inline-flex pt-1 pl-0.5 text-[11px] align-middle">
			<div className={`mr-1 text-${statusColorLookup[feature.status]}`}># {feature.status}</div>
			<div className="inline-flex pr-1 font-bold align-middle text-theme-gray">
				at
				<div className="mx-1">
					{
						readableDate(new Date(feature.updated_at).toISOString())
					}
				</div>
				:
				<div className="mx-1 ">
					{
						readableTime(new Date(feature.updated_at).toISOString())
					}
				</div>		
			</div>
			
		</div>
	);
};

export const FeatureCard: React.FC<IFeatureCardProps> = ({
	feature
}: IFeatureCardProps): JSX.Element => {
	return (
		<Card
			className="mt-5 font-medium"
			style={{ backgroundColor: constants.THEME.BLACK }}
		>
			<CardContent>
				<div
					className="inline-flex text-[20px] font-extrabold text-theme-gray mb-5">
					{feature.title}
				</div>
				<div className="p-2 overflow-hidden rounded-md bg-theme-dark-black text-theme-gray">
					{feature.body}
				</div>
				<PendingStatus feature={feature} />
				<Separator />
				<PosterInfo feature={feature} />
				<Timestamp date={feature.created_at} />
			</CardContent>
		</Card>
	);
};