import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { constants } from "@utils";
import { AppLink } from "@components/AppLink";
import { useAuthStore } from "@store/useAuth";
import { ClientConnectionStatus } from "@types";

const success = () => {
	const { query } = useRouter();
	const { updateAuthCache } = useAuthStore();

	useEffect(() => {
		const { connection_status } = query;
		updateAuthCache({ connection_status: connection_status as ClientConnectionStatus });
	}, [query]);

	return (
		<div className="max-w-[500px] min-h-screen pt-5 pb-5 m-auto px-5 mr-auto text-center">
			<Card style={{ backgroundColor: constants.THEME.BLACK }}>
				<CardContent>
					<div className="text-xl font-extrabold text-theme-gray font-content">
						account connected successfully!
						<CheckCircleOutlineIcon className="ml-2" style={{ color: constants.THEME.GREEN }} />
					</div>
					<div className="pt-2">
						<AppLink href="/user">HOME</AppLink>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default success;
