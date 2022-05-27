import toast from "react-hot-toast";
import useSWR from "swr";
import type { IServer } from "btbot-types";

import { useAuthStore } from "@store/useAuth";
import { nextBackend } from "@utils";
import { ClientConnectionStatus } from "@types";

export function useGuilds() {
	const { authCache } = useAuthStore();

	const fetchGuilds = async (key: string) => {
		try {
			if (authCache?.connection_status === ClientConnectionStatus.disconnected) {
				return;
			}
			const data = await nextBackend.get<IServer[]>(key);
			return data;
		} catch (error) {
			toast.error(error as string);
		}
	};

	const { data, error } = useSWR("guilds", () => fetchGuilds("guilds"), {
		refreshInterval: 60_000
	});
	return {
		isLoading: data == null && !error,
		data,
		error
	};
}
