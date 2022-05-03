import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";

import type { IServerMetadata } from "@types";
import { useServerStore } from "@store/useServer";
import { UserCard } from "@components/user/UserCard";
import { ServerCard } from "@components/server/ServerCard";
import { ScrollToTop } from "@components/ScrollToTop";
import { getServerData } from "@rest";
import { Loader } from "@components/Loader";

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
			<div className="min-h-screen pt-10 m-auto text-center">
				<Loader />
			</div>
		);
	}

	return (
		<>
			<div className="max-w-[600px] min-h-screen pt-5 pb-5 m-auto">
				<ServerCard />
				{
					metaData.users.map((user, key) => <UserCard key={key} user={user} index={key} />)
				}
				<ScrollToTop />
			</div>
		</>
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
