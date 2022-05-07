import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import type { IServerMetadata } from "@types";
import { UserCard } from "@components/user/UserCard";
import { ServerCard } from "@components/server/ServerCard";
import { ScrollToTop } from "@components/ScrollToTop";
import { Loader } from "@components/Loader";
import { useServer } from "@hooks/useServer";
import { Error } from "@components/Error";

const Server = () => {
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
		<>
			<div className="max-w-[600px] min-h-screen pt-5 pb-5 m-auto px-5">
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
