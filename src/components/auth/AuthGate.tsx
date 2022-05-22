import { useAuthStore } from "@store/useAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { config } from "@utils";

export const AuthGate = ({
	children
}: {
	children: React.ReactNode
}): JSX.Element => {

	const { authCache, updateAuthCache, clearAuthCache } = useAuthStore();
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
		updateAuthCache({ ...authCache, ...data });
	};

	useEffect(() => {
		if (!authCache.refresh_token && !authCache.access_token) {
			push("/");
			return;
		}
		refresh();
	}, []);

	return (
		<>
			{children}
		</>
	);
};
