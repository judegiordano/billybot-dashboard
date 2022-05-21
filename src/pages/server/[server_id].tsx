import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import type { IServer } from "@types";
import { UserSection } from "@components/user/UserSection";
import { ServerCard } from "@components/server/ServerCard";
import { ScrollToTop } from "@components/ScrollToTop";
import { Loader } from "@components/Loader";
import { useServer } from "@hooks/useServer";
import { Error } from "@components/Error";
import { AnnouncementSection } from "@components/announcement/AnnouncementSection";
import { LotterySection } from "@components/lottery/LotterySection";
import { FeaturesSection } from "@components/feature/FeaturesSection";
import { constants } from "@utils";

const Server = () => {

	const [tabValue, setTabValue] = useState("1");
	const toggleTab = (_: unknown, newValue: string) => setTabValue(newValue);

	const { query } = useRouter();
	const { data, isLoading, error } = useServer(query.server_id as string);
	const [server, setServer] = useState<IServer>();
	const [errorState, setErrorState] = useState<string | undefined>();

	useEffect(() => {
		if (!error) return setErrorState(undefined);
		setErrorState(error.toString());
		console.log({ error });
	}, [error]);

	useEffect(() => {
		data && setServer(data);
	}, [data]);

	if (errorState) return <Error message={errorState} />;
	if (isLoading || !server) return <Loader />;

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
								<Tab style={{ color: constants.THEME.GRAY }} label="Feature Requests" value="4" />
							</TabList>
						</Box>
						<TabPanel value="1">
							<UserSection />
						</TabPanel>
						<TabPanel value="2">
							<AnnouncementSection />
						</TabPanel>
						<TabPanel value="3">
							<LotterySection />
						</TabPanel>
						<TabPanel value="4">
							<FeaturesSection />
						</TabPanel>
					</TabContext>
				</Box>
			</div>
			<ScrollToTop />
		</div>
	);
};

export default React.memo(Server);
