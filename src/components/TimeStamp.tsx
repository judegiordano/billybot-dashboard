import React from "react";
import { readableDate, readableTime } from "@utils";

interface ITimestampProps {
	date: Date | string
}

export const TimeStamp = ({ date }: ITimestampProps) => {
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
