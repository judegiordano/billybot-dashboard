import toast from "react-hot-toast";
import useSWR from "swr";
import type { IClient } from "btbot-types";

import { useAuthStore } from "@store/useAuth";
import { nextBackend } from "@utils";
import { ClientConnectionStatus } from "@types";

export function useAuth() {
	const { authCache, updateAuthCache } = useAuthStore();

	const refresh = async (key: string) => {
		try {
			if (authCache?.connection_status === ClientConnectionStatus.disconnected) {
				console.log("no client connected");
				return;
			}
			const data = await nextBackend.post<IClient>(`oauth/${key}`);
			updateAuthCache({
				...authCache,
				email: data.email,
				username: data.username,
				auth_state: {
					user_id: data?.auth_state?.user_id,
					username: data?.auth_state?.username,
					discriminator: data?.auth_state?.discriminator,
					avatar: data?.auth_state?.avatar
				}
			});
		} catch (error) {
			toast.error(error as string);
		}
	};
	const { data, error } = useSWR("refresh", () => refresh("refresh"), {
		refreshInterval: 60_000
	});
	return {
		isLoading: data == null && !error,
		authCache,
		error
	};
}
