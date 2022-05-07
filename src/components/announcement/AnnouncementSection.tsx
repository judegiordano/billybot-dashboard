import React, { useEffect, useState } from "react";

import type { IAnnouncement } from "@types";
import { Loader } from "@components/Loader";
import { AnnouncementCard } from "./AnnouncementCard";
import { useServerStore } from "@store/useServer";
import { EmptyDataState } from "@components/EmptyDataState";

export const AnnouncementSection = () => {
	const { serverCache } = useServerStore();
	const [announcements, setAnnouncements] = useState<IAnnouncement[] | undefined>();

	useEffect(() => {
		serverCache && setAnnouncements(serverCache.announcements);
	}, [serverCache]);

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
