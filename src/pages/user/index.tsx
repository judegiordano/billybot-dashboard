import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import type { IServer } from "btbot-types";

import { constants } from "@utils";
import { AuthGate } from "@components/auth/AuthGate";
import { GuildsView } from "@components/auth/GuildsView";
import { useGuilds } from "@hooks/useGuilds";

const Spinner = ({
	visible,
	size = 20,
	color = constants.THEME.WHITE
}: {
	visible: boolean,
	size?: number,
	color?: string
}) => {
	if (!visible) return null;
	return <CircularProgress size={size} style={{ color }} />;
};

export const Home = () => {
	const [guilds, setGuilds] = useState<IServer[] | undefined>();
	const { data, loading } = useGuilds();

	useEffect(() => {
		setGuilds(data);
	}, [data]);

	return (
		<AuthGate>
			<div className="min-h-screen m-auto max-w-[500px] mr-auto text-center">
				<div className="pt-5">
					<Spinner visible={!guilds && loading} size={50} color={constants.THEME.PURPLE} />
				</div>
				{
					guilds?.length === 0 && !loading && (
						<div className="pt-5 font-bold font-content text-theme-blue">no servers registered</div>
					)
				}
				{
					guilds?.map((guild, key) => <GuildsView key={key} guild={guild} />)
				}
			</div>
		</AuthGate>
	);
};

export default Home;
