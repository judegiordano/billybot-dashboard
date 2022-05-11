import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

import { UserCard } from "@components/user/UserCard";
import { Loader } from "@components/Loader";
import { EmptyDataState } from "@components/EmptyDataState";
import { useUsers } from "@hooks/useUsers";
import type { UserPagination } from "@store/useUsers";

export const UserSection = () => {
	const { query } = useRouter();
	const [page, setPage] = useState(1);
	const [username, setUsername] = useState("");
	const [isMayor, setIsMayor] = useState<boolean | null>(null);
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
	const [bucks, setBucks] = useState<number>(-1);
	const key = `${query.server_id}?page=${page}&username=${username}&is_mayor=${isMayor}&is_admin=${isAdmin}&billy_bucks=${bucks}`;
	const { data } = useUsers(key);
	const [paginatedUsers, setPaginatedUsers] = useState<UserPagination | undefined>();

	const changePage = (_: unknown, value: number) => setPage(value);
	const filteringComponents = [
		{ text: "mayor", method: () => isMayor === true ? setIsMayor(null) : setIsMayor(true) },
		{ text: "bot admins", method: () => isAdmin === true ? setIsAdmin(null) : setIsAdmin(true) },
		{ text: "sort bucks", method: () => bucks === -1 ? setBucks(1) : setBucks(-1) },
	];

	useEffect(() => {
		data && setPaginatedUsers(data);
	}, [data]);

	if (!paginatedUsers) return <Loader />;
	return (
		<>
			<TextField
				className="bg-theme-black"
				variant="filled"
				type="text"
				label="username"
				onChange={e => {
					setPage(1);
					setUsername(e.target.value);
				}}
			/>
			<div>
				{
					filteringComponents.map((component, key) => (
						<div key={key} className="inline-flex items-center pl-2 text-theme-gray">
							<div>
								{component.text}
							</div>
							<Checkbox onChange={() => {
								setPage(1);
								{ component.method(); }
							}} />
						</div>
					))
				}
			</div>
			{
				paginatedUsers.users.length <= 0 && (
					<EmptyDataState text="no users" />
				)
			}
			{
				paginatedUsers.users.map((user, key) => <UserCard key={key} user={user} index={key} />)
			}
			<div className="mt-5 bg-theme-black">
				<Pagination
					color="primary"
					showFirstButton
					showLastButton
					className="flex justify-center pt-5 pb-5"
					count={paginatedUsers.pages}
					page={page}
					onChange={changePage}
				/>
			</div>
		</>
	);
};
