import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";

import type { IServerMetadata } from "@types";
import { useServerStore } from "@store/useServer";
import { UserCard } from "@components/user/UserCard";
import { ServerCard } from "@components/server/ServerCard";
import { ScrollToTop } from "@components/ScrollToTop";
import { getServerData } from "@rest";

interface IServerProps {
	server: IServerMetadata
}

const Server = ({ server }: IServerProps) => {
	const { updateServerCache, serverCache } = useServerStore();
	const [metaData, setMetaData] = useState<IServerMetadata>();

	useEffect(() => {
		updateServerCache(server);
		setMetaData(server);
	}, [serverCache, server]);

	if (!metaData) {
		return (
			<div>loading user info...</div>
		);
	}

	return (
		<div className="min-h-screen pt-5 pb-5 m-auto max-w-7xl">
			<ServerCard />
			{
				metaData.users.map((user, key) => <UserCard key={key} user={user} index={key} />)
			}
			<ScrollToTop />
		</div>
	);
};

export default React.memo(Server);

export async function getServerSideProps(context: GetServerSidePropsContext) {
	if (!context?.params?.server_id || typeof context?.params?.server_id !== "string") {
		return {
			redirect: {
				permanent: false,
				destination: "/bad-request"
			}
		};
	}
	const { server_id } = context.params;
	const server = await getServerData(server_id);
	if (server.ok === false && server.error) {
		return {
			redirect: {
				permanent: false,
				destination: "/resource-not-found"
			}
		};
	}
	return {
		props: {
			server
		}
	};
}
