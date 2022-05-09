import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import type { IAnnouncement } from "@types";
import { Loader } from "@components/Loader";
import { AnnouncementCard } from "./AnnouncementCard";
import { EmptyDataState } from "@components/EmptyDataState";
import { useAnnouncements } from "@hooks/useAnnouncements";

export const AnnouncementSection = () => {
	const { query } = useRouter();
	const { data } = useAnnouncements(query.server_id as string);
	const [announcements, setAnnouncements] = useState<IAnnouncement[] | undefined>();

	useEffect(() => {
		data && setAnnouncements(data);
	}, [data]);

	if (!announcements) return <Loader />;
	if (announcements.length <= 0) return <EmptyDataState text="no announcements yet" />;
	return (
		<>
			{
				announcements.map((msg, key) => <AnnouncementCard key={key} announcement={msg} />)
			}
		</>
	);
};
