import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";

import { config, constants } from "@utils";
import { useAuthStore } from "@store/useAuth";
import { useUserInfo } from "@hooks/useUserInfo";

const index = ({
	refresh_token,
	access_token
}: {
	refresh_token: string,
	access_token: string
}) => {
	const { authCache, updateAuthCache, clearAuthCache } = useAuthStore();
	const { authCache: userInfo, logout } = useUserInfo();
	const { push } = useRouter();

	const refresh = async () => {
		const params = new URLSearchParams({ refresh_token: authCache.refresh_token as string }).toString();
		const response = await fetch(`${config.NEXT_PUBLIC_BACKEND_API}/oauth/refresh?${params}`, {
			method: "POST",
		});
		const data = await response.json();
		if (!response.ok) {
			toast.error(data.error ?? "internal server error");
			clearAuthCache();
			push("/");
			return;
		}
		updateAuthCache(data);
	};

	useEffect(() => {
		if (!authCache.refresh_token && !authCache.access_token) {
			return updateAuthCache({ refresh_token, access_token });
		}
		refresh();
	}, []);

	return (
		<div className="min-h-screen pt-10 m-auto text-2xl text-center">
			<div className="text-theme-gray">Welcome, <span className="text-theme-purple">{userInfo.username}</span>!</div>
			<div className="pt-2">
				<Button
					className="font-extrabold"
					style={{ backgroundColor: constants.THEME.PURPLE, color: constants.THEME.WHITE }}
					onClick={async () => await logout()}
				>
					logout
				</Button>
			</div>
		</div>
	);
};

export default index;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	return {
		props: {
			refresh_token: context.query?.refresh_token ?? null,
			access_token: context.query?.access_token ?? null
		}
	};
};
