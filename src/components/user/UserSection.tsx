import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";

import { UserCard } from "@components/user/UserCard";
import { Loader } from "@components/Loader";
import { EmptyDataState } from "@components/EmptyDataState";
import { useUsers } from "@hooks/useUsers";
import type { UserPagination } from "@store/useUsers";

export const UserSection = () => {
	const { query } = useRouter();
	const [page, setPage] = useState(1);
	const [username, setUsername] = useState("");
	const { data } = useUsers(`${query.server_id}?page=${page}&username=${username}`);
	const [pagination, setPagination] = useState<UserPagination | undefined>();
	const handleChange = (_: unknown, value: number) => {
		setPage(value);
	};

	useEffect(() => {
		data && setPagination(data);
	}, [data]);

	if (!pagination) return <Loader />;
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
			{
				pagination.users.length <= 0 && (
					<EmptyDataState text="no users" />
				)
			}
			{
				pagination.users.map((user, key) => <UserCard key={key} user={user} index={key} />)
			}
			<div className="mt-5 bg-theme-black">
				<Pagination
					color="primary"
					showFirstButton
					showLastButton
					className="flex justify-center pt-5 pb-5"
					count={pagination.pages}
					page={page}
					onChange={handleChange}
				/>
			</div>
		</>
	);
};
