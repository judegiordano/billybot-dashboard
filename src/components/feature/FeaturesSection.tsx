import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import Checkbox from "@mui/material/Checkbox";

import { Loader } from "@components/Loader";
import { EmptyDataState } from "@components/EmptyDataState";
import { useFeatures } from "@hooks/useFeatures";
import type { FeaturePagination } from "@store/useFeatures";
import { FeatureCard } from "./FeatureCard";

export const FeaturesSection = () => {
	const { query } = useRouter();
	const [page, setPage] = useState(1);
	const [createdAt, setCreatedAt] = useState<number>(-1);
	const key = `${query.server_id}?page=${page}&created_at=${createdAt}`;
	const { data } = useFeatures(key);
	const [paginatedFeatures, setPaginatedFeatures] = useState<FeaturePagination>();
	const changePage = (_: unknown, value: number) => setPage(value);
	const filteringComponents = [
		{ text: "sort oldest", method: () => createdAt === -1 ? setCreatedAt(1) : setCreatedAt(-1) },
	];

	useEffect(() => {
		data && setPaginatedFeatures(data);
	}, [data]);

	if (!paginatedFeatures) return <Loader />;
	if (paginatedFeatures.features.length <= 0)
		return <EmptyDataState text="no features yet" />;
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
				paginatedFeatures.features.map((msg, key) => (
					<FeatureCard key={key} feature={msg} />
				))
			}
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
		</>
	);
};
