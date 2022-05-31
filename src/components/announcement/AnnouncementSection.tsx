import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import Checkbox from "@mui/material/Checkbox";

import { Loader } from "@components/Loader";
import { AnnouncementCard } from "./AnnouncementCard";
import { useAnnouncements, AnnouncementPagination } from "@hooks/useAnnouncements";
import { EmptyDataState } from "@components/EmptyDataState";

export const AnnouncementSection = () => {
	const { query } = useRouter();
	const [page, setPage] = useState(1);
	const [createdAt, setCreatedAt] = useState<number>(-1);
	const params = new URLSearchParams({ page: page.toString(), created_at: createdAt.toString() }).toString();
	const key = `${query.server_id}?${params}`;
	const { data, loading } = useAnnouncements(key);

	const [pagination, setPagination] = useState<AnnouncementPagination>();
	const changePage = (_: unknown, value: number) => setPage(value);
	const filteringComponents = [
		{ text: "sort oldest", method: () => createdAt === -1 ? setCreatedAt(1) : setCreatedAt(-1) },
	];

	useEffect(() => {
		setPagination(data);
	}, [data]);

	return (
		<>
			{
				<div>
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
						loading && !pagination && <Loader />
					}
					{
						pagination?.announcements?.length === 0 && <EmptyDataState text="no announcements yet" />
					}
					{
						pagination?.announcements?.map((msg, key) => <AnnouncementCard key={key} announcement={msg} />)
					}
					{
						pagination?.announcements && pagination?.announcements?.length >= 1 && (
							<div className="mt-5 bg-theme-black">
								<Pagination
									color="primary"
									showFirstButton
									showLastButton
									className="flex justify-center pt-5 pb-5"
									count={pagination?.pages}
									page={page}
									onChange={changePage}
								/>
							</div>
						)
					}
				</div>
			}
		</>
	);
};
