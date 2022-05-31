import React, { useEffect, useState } from "react";
import type { GetServerSidePropsContext } from "next";

import { config } from "@utils";
import type { IServerInfo } from "@types";
import { Loader } from "@components/Loader";
import { useServer } from "@hooks/test/useServer";
import { ScrollToTop } from "@components/ScrollToTop";
import { AuthGate } from "@components/auth/AuthGate";
import { ServerCard } from "@components/server/ServerCard";
import { ServerDataTabulation } from "@components/ServerDataTabulation";

const Server = ({ server_id }: { server_id: string }) => {
	const { data, loading } = useServer(server_id);
	const [server, setServer] = useState<IServerInfo | undefined>();

	useEffect(() => {
		setServer(data);
	}, [data]);

	return (
		<AuthGate>
			{loading && !server && (
				<div className="min-h-screen m-auto max-w-[500px] mr-auto text-theme-gray">
					<Loader />
				</div>
			)}
			{
				server && (
					<div className="min-h-screen m-auto max-w-[750px] mr-auto text-theme-gray">
						<ServerCard />
						<ServerDataTabulation />
					</div>
				)
			}
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

export default Server;
