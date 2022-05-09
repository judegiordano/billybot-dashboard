import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";

import type { IServerMetadata } from "@types";
import { UserSection } from "@components/user/UserSection";
import { ServerCard } from "@components/server/ServerCard";
import { ScrollToTop } from "@components/ScrollToTop";
import { Loader } from "@components/Loader";
import { useServer } from "@hooks/useServer";
import { Error } from "@components/Error";
import { AnnouncementSection } from "@components/announcement/AnnouncementSection";
import { LotterySection } from "@components/lottery/LotterySection";
import { constants } from "@utils";

const Server = () => {
	const [tabValue, setTabValue] = useState("1");
	const toggleTab = (_: unknown, newValue: string) => {
		setTabValue(newValue);
	};
	const handleChange = (_: unknown, value: number) => {
		setPage(value);
	};

	const { query } = useRouter();
	const [page, setPage] = useState(1);
	const { data, isLoading, error } = useServer(`${query.server_id}?page=${page}`);
	const [metaData, setMetaData] = useState<IServerMetadata>({} as IServerMetadata);
	const [errorState, setErrorState] = useState<string | undefined>();

	useEffect(() => {
		if (!error) return setErrorState(undefined);
		setErrorState(error.toString());
		console.log({ error });
	}, [error]);

	useEffect(() => {
		setMetaData(data);
	}, [data]);

	if (errorState) return <Error message={errorState} />;
	if (isLoading || !metaData) return <Loader />;
	return (
		<div className="max-w-[800px] min-h-screen pt-5 pb-5 m-auto px-5">
			<ServerCard />
			<div className="pt-[10px]">
				<Box sx={{ width: "100%" }}>
					<TabContext value={tabValue}>
						<Box sx={{ borderBottom: 1, borderColor: constants.THEME.BLACK }}>
							<TabList onChange={toggleTab} >
								<Tab style={{ color: constants.THEME.GRAY }} label="Users" value="1" />
								<Tab style={{ color: constants.THEME.GRAY }} label="Announcements" value="2" />
								<Tab style={{ color: constants.THEME.GRAY }} label="Lottery" value="3" />
							</TabList>
						</Box>
						<TabPanel value="1">
							<UserSection />
							<div className="mt-5 bg-theme-black">
								<Pagination
									color="primary"
									showFirstButton
									showLastButton
									className="flex justify-center pt-5 pb-5"
									count={metaData.user_pages}
									page={page}
									onChange={handleChange}
								/>
							</div>
						</TabPanel>
						<TabPanel value="2">
							<AnnouncementSection />
						</TabPanel>
						<TabPanel value="3">
							<LotterySection />
						</TabPanel>
					</TabContext>
				</Box>
			</div>
			<ScrollToTop />
		</div>
	);
};

export default React.memo(Server);
