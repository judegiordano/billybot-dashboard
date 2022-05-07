import React, { useEffect, useState } from "react";

import type { IUser } from "@types";
import { UserCard } from "@components/user/UserCard";
import { Loader } from "@components/Loader";
import { useServerStore } from "@store/useServer";
import { EmptyDataState } from "@components/EmptyDataState";

export const UserSection = () => {
	const { serverCache } = useServerStore();
	const [users, setUsers] = useState<IUser[] | undefined>();

	useEffect(() => {
		serverCache && setUsers(serverCache.users);
	}, [serverCache]);

	if (!users) return <Loader />;
	if (users.length <= 0) return <EmptyDataState text="no users" />;
	return (
		<>
			{
				users.map((user, key) => <UserCard key={key} user={user} index={key} />)
			}
		</>
	);
};
