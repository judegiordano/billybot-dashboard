import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import Checkbox from "@mui/material/Checkbox";

import { Loader } from "@components/Loader";
import { EmptyDataState } from "@components/EmptyDataState";
// import { useFeatures } from "@hooks/useFeatures";
// import type { FeaturePagination } from "@store/useFeatures";
import { FeatureCard } from "./FeatureCard";
import { FeaturePagination, useFeatures } from "@hooks/test/useFeatures";

export const FeaturesSection = () => {
	const { query } = useRouter();
	const [page, setPage] = useState(1);
	const [createdAt, setCreatedAt] = useState<number>(-1);
	const params = new URLSearchParams({ page: page.toString(), created_at: createdAt.toString() }).toString();
	const key = `${query.server_id}?${params}`;
	const { data, loading } = useFeatures(key);
	const [paginatedFeatures, setPaginatedFeatures] = useState<FeaturePagination>();
	const changePage = (_: unknown, value: number) => setPage(value);
	const filteringComponents = [
		{ text: "sort oldest", method: () => createdAt === -1 ? setCreatedAt(1) : setCreatedAt(-1) },
	];

	useEffect(() => {
		setPaginatedFeatures(data);
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
						loading && !paginatedFeatures && <Loader />
					}
					{
						paginatedFeatures?.features?.length === 0 && <EmptyDataState text="no requested features yet" />
					}
					{
						paginatedFeatures?.features.map((msg, key) => <FeatureCard key={key} feature={msg} />)
					}
					{
						paginatedFeatures?.features && paginatedFeatures?.features?.length >= 1 && (
							<div className="mt-5 bg-theme-black">
								<Pagination
									color="primary"
									showFirstButton
									showLastButton
									className="flex justify-center pt-5 pb-5"
									count={paginatedFeatures.pages}
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
