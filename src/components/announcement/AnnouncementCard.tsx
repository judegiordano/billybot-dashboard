import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { IAnnouncement } from "btbot-types";

import { constants } from "@utils";
import { Separator } from "@components/Separator";
import { TimeStamp } from "@components/TimeStamp";

interface IAnnouncementCardProps {
	announcement: IAnnouncement
}

const PosterInfo = ({ announcement }: { announcement: IAnnouncement }) => {
	return (
		<div className="inline-flex pr-1 text-theme-gray">
			- {announcement.user.username}
			<div className="inline-flex pl-1 pt-1 text-[13px] italic align-middle">
				#
			</div>
			<div className="inline-flex pt-1 pl-0.5 text-[11px] italic align-middle">
				{announcement.channel_name}
			</div>
		</div>
	);
};

export const AnnouncementCard: React.FC<IAnnouncementCardProps> = ({
	announcement
}: IAnnouncementCardProps): JSX.Element => {
	return (
		<Card
			className="mt-5 font-medium"
			style={{ backgroundColor: constants.THEME.BLACK }}
		>
			<CardContent>
				<div className="p-2 overflow-scroll rounded-md bg-theme-dark-black text-theme-gray">
					{announcement.text}
				</div>
				<Separator />
				<PosterInfo announcement={announcement} />
				<TimeStamp date={announcement.created_at} />
			</CardContent>
		</Card>
	);
};
