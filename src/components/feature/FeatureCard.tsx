import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { IFeature } from "btbot-types";

import { FeatureStatus } from "@types";
import { constants } from "@utils";
import { Separator } from "@components/Separator";
import { TimeStamp } from "@components/TimeStamp";

interface IFeatureCardProps {
	feature: IFeature
}

const PosterInfo = ({ username }: { username: string }) => {
	return (
		<div className="inline-flex pr-1 text-theme-gray">
			Suggested By - {username}
		</div>
	);
};

const statusColorLookup: Record<FeatureStatus, string> = {
	[FeatureStatus.pending] : "theme-yellow",
	[FeatureStatus.completed] : "theme-green",
	[FeatureStatus.rejected] : "theme-red",
	[FeatureStatus.in_progress]: "theme-yellow"
};

const PendingStatus = ({status, updated} : {status : FeatureStatus, updated: Date | string}) => {
	return (
		<div className="inline-flex pt-1 pl-0.5 text-[11px] align-middle">
			<div className={`mr-1 text-${statusColorLookup[status]}`}># {status.replace(/_/gmi, " ")}</div>
			<TimeStamp date={updated} />
		</div>
	);
};

export const FeatureCard = ({ feature }: IFeatureCardProps) => {
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
				<PendingStatus status={feature.status} updated={feature.updated_at} />
				<Separator />
				<PosterInfo username={feature.user.username as string} />
				<TimeStamp date={feature.created_at} />
			</CardContent>
		</Card>
	);
};
