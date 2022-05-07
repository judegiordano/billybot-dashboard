import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import type { IServerMetadata, } from "@types";
import { UserSection } from "@components/user/UserSection";
import { ServerCard } from "@components/server/ServerCard";
import { ScrollToTop } from "@components/ScrollToTop";
import { Loader } from "@components/Loader";
import { useServer } from "@hooks/useServer";
import { Error } from "@components/Error";
import { AnnouncementSection } from "@components/announcement/AnnouncementSection";

const Server = () => {
	const [tabValue, setTabValue] = React.useState("1");
	const toggleTab = (_: unknown, newValue: string) => {
		setTabValue(newValue);
	};

	const { query } = useRouter();
	const { data, isLoading, error } = useServer(query.server_id as string);
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
		<div className="max-w-[700px] min-h-screen pt-5 pb-5 m-auto px-5">
			<ServerCard />
			<div className="pt-[10px]">
				<Box sx={{ width: "100%" }}>
					<TabContext value={tabValue}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<TabList onChange={toggleTab}>
								<Tab className="text-theme-gray" label="Users" value="1" />
								<Tab className="text-theme-gray" label="Announcements" value="2" />
							</TabList>
						</Box>
						<TabPanel value="1">
							<UserSection />
						</TabPanel>
						<TabPanel value="2">
							<AnnouncementSection />
						</TabPanel>
					</TabContext>
				</Box>
			</div>
			<ScrollToTop />
		</div>
	);
};

export default React.memo(Server);
