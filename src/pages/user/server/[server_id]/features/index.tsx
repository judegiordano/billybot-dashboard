import React, { useEffect, useState } from "react";
import type { GetServerSidePropsContext } from "next";
import Pagination from "@mui/material/Pagination";
import Checkbox from "@mui/material/Checkbox";

import { Loader } from "@components/Loader";
import { EmptyDataState } from "@components/EmptyDataState";
import { FeaturePagination, useFeatures } from "@hooks/useFeatures";
import { config } from "@utils";
import { AuthGate } from "@components/auth/AuthGate";
import { FeatureCard } from "@components/feature/FeatureCard";
import { ScrollToTop } from "@components/ScrollToTop";
import { BackButton } from "@components/BackButton";

const index = ({ server_id }: { server_id: string }) => {
	const [page, setPage] = useState(1);
	const [createdAt, setCreatedAt] = useState<number>(-1);
	const params = new URLSearchParams({ page: page.toString(), created_at: createdAt.toString() }).toString();
	const key = `${server_id}?${params}`;
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
		<AuthGate>
			<div className="min-h-screen m-auto max-w-[750px] mr-auto text-theme-gray">
				<BackButton server_id={server_id} />
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
			<ScrollToTop />
		</AuthGate>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	if (!context.query.server_id) {
		return {
			redirect: {
				destination: `${config.NEXT_PUBLIC_DOMAIN}/`,
				permanent: false,
			},
		};
	}
	return {
		props: {
			server_id: context.query.server_id
		}
	};
}

export default index;
