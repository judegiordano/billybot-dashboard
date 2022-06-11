import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

import { UserCard } from "@components/user/UserCard";
import { Loader } from "@components/Loader";
import { EmptyDataState } from "@components/EmptyDataState";
import { UserPagination, useUsers } from "@hooks/useUsers";

export const UserSection = () => {
	const { query } = useRouter();
	const [page, setPage] = useState(1);
	const [username, setUsername] = useState("");
	const [isMayor, setIsMayor] = useState<boolean | null>(null);
	const [isFool, setIsFool] = useState<boolean | null>(null);
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
	const [bucks, setBucks] = useState<number>(-1);

	const params = new URLSearchParams({
		page: page.toString(),
		username,
		...(isMayor !== null ? { is_mayor: isMayor?.toString() } : null),
		...(isFool !== null ? { is_fool: isFool?.toString() } : null),
		...(isAdmin !== null ? { is_admin: isAdmin?.toString() } : null),
		billy_bucks: bucks.toString()
	}).toString();
	const key = `${query.server_id}?${params}`;
	const { data, loading } = useUsers(key);
	const [paginatedUsers, setPaginatedUsers] = useState<UserPagination>();

	const changePage = (_: unknown, value: number) => setPage(value);
	const filteringComponents = [
		{ text: "mayor", method: () => isMayor === true ? setIsMayor(null) : setIsMayor(true) },
		{ text: "fool", method: () => isFool === true ? setIsFool(null) : setIsFool(true) },
		{ text: "bot admins", method: () => isAdmin === true ? setIsAdmin(null) : setIsAdmin(true) },
		{ text: "sort bucks", method: () => bucks === -1 ? setBucks(1) : setBucks(-1) },
	];

	useEffect(() => {
		setPaginatedUsers(data);
	}, [data]);

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
				loading && !paginatedUsers && <Loader />
			}
			{
				paginatedUsers?.users?.length === 0 && !loading && <EmptyDataState text="no users found" />
			}
			{
				paginatedUsers?.users.map((user, key) => <UserCard key={key} user={user} />)
			}
			{
				paginatedUsers && paginatedUsers.users?.length >= 1 && (
					<div className="mt-5 bg-theme-black">
						<Pagination
							color="primary"
							showFirstButton
							showLastButton
							className="flex justify-center pt-5 pb-5"
							count={paginatedUsers?.pages}
							page={page}
							onChange={changePage}
						/>
					</div>
				)
			}
		</>
	);
};
