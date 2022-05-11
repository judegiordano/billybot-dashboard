import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import Checkbox from "@mui/material/Checkbox";

import { Loader } from "@components/Loader";
import { AnnouncementCard } from "./AnnouncementCard";
import { EmptyDataState } from "@components/EmptyDataState";
import { useAnnouncements } from "@hooks/useAnnouncements";
import type { AnnouncementPagination } from "@store/useAnnouncements";

export const AnnouncementSection = () => {
	const { query } = useRouter();
	const [page, setPage] = useState(1);
	const [createdAt, setCreatedAt] = useState<number>(-1);
	const key = `${query.server_id}?page=${page}&created_at=${createdAt}`;
	const { data } = useAnnouncements(key);
	const [paginatedAnnouncements, setPaginatedAnnouncements] = useState<AnnouncementPagination>();
	const changePage = (_: unknown, value: number) => setPage(value);
	const filteringComponents = [
		{ text: "sort oldest", method: () => createdAt === -1 ? setCreatedAt(1) : setCreatedAt(-1) },
	];

	useEffect(() => {
		data && setPaginatedAnnouncements(data);
	}, [data]);

	if (!paginatedAnnouncements) return <Loader />;
	if (paginatedAnnouncements.announcements.length <= 0)
		return <EmptyDataState text="no announcements yet" />;
	return (
		<>
			<div>
				{
					filteringComponents.map((component, key) => (
						<div key={key} className="inline-flex items-center pl-2 text-theme-gray">
							<div>
								{component.text}
							</div>
							<Checkbox onChange={() => {
								setPage(1);
								{ component.method(); }
							}} />
						</div>
					))
				}
			</div>
			{
				paginatedAnnouncements.announcements.map((msg, key) => (
					<AnnouncementCard key={key} announcement={msg} />
				))
			}
			<div className="mt-5 bg-theme-black">
				<Pagination
					color="primary"
					showFirstButton
					showLastButton
					className="flex justify-center pt-5 pb-5"
					count={paginatedAnnouncements.pages}
					page={page}
					onChange={changePage}
				/>
			</div>
		</>
	);
};
