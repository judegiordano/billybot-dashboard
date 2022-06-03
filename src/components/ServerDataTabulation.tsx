import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";

import { constants } from "@utils";
import { UserSection } from "./user/UserSection";
import { AnnouncementSection } from "./announcement/AnnouncementSection";
import { LotterySection } from "./lottery/LotterySection";
import { FeaturesSection } from "./feature/FeaturesSection";

export const ServerDataTabulation = () => {
	const [tabValue, setTabValue] = useState("1");
	const toggleTab = (_: unknown, newValue: string) => setTabValue(newValue);

	return (
		<div className="pt-[10px]">
			<Box sx={{ width: "100%" }}>
				<TabContext
					value={tabValue}>
					<Box sx={{ borderBottom: 1, borderColor: constants.THEME.BLACK }}>
						<Tabs
							value={tabValue}
							onChange={toggleTab}
							variant="scrollable"
							scrollButtons
							allowScrollButtonsMobile
						>
							<Tab style={{ color: constants.THEME.GRAY }} label="Users" value="1" />
							<Tab style={{ color: constants.THEME.GRAY }} label="Announcements" value="2" />
							<Tab style={{ color: constants.THEME.GRAY }} label="Lottery" value="3" />
							<Tab style={{ color: constants.THEME.GRAY }} label="Feature Requests" value="4" />
						</Tabs>
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
	);
};
