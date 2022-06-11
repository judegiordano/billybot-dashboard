import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ClientConnectionStatus, IServer } from "btbot-types";

import { constants, errorHandler, nextBackend } from "@utils";
import { AuthGate } from "@components/auth/AuthGate";
import { GuildsView } from "@components/auth/GuildsView";
import { useGuilds } from "@hooks/useGuilds";
import { useAuthStore } from "@hooks/useAuth";
import { useRouter } from "next/router";

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
	const { push } = useRouter();
	const [guilds, setGuilds] = useState<IServer[] | undefined>();
	const [connection, setConnection] = useState<ClientConnectionStatus>();
	const { data, loading } = useGuilds();
	const { authCache } = useAuthStore();

	async function connectAccount() {
		try {
			const data = await nextBackend.get<{ redirect_url: string }>("clients/oauth");
			await push(data.redirect_url);
			return;
		} catch (error) {
			errorHandler(error);
		}
	}

	useEffect(() => {
		setConnection(authCache?.connection_status);
		setGuilds(data);
	}, [data, authCache]);

	return (
		<AuthGate>
			{
				connection === ClientConnectionStatus.disconnected && (
					<div className="min-h-screen m-auto max-w-[500px] mr-auto text-center">
						<button
							onClick={connectAccount}
							className="pt-3 pb-3 pl-5 pr-5 mt-5 text-lg font-bold text-white rounded-[12px] bg-theme-purple">
								connect account
						</button>
					</div>
				)
			}
			<div className="min-h-screen m-auto max-w-[500px] mr-auto text-center pl-7 pr-7">
				<div className="pt-5">
					<Spinner visible={!guilds && loading} size={50} color={constants.THEME.PURPLE} />
				</div>
				{
					guilds?.length === 0 && !loading && (
						<div className="pt-5 font-bold font-content text-theme-blue">no servers registered</div>
					)
				}
				{
					guilds?.map((guild, key) => <GuildsView key={key} server={guild} />)
				}
			</div>
		</AuthGate>
	);
};

export default Home;
