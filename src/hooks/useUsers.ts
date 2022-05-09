import { useSWRConfig } from "swr";

import { useApi } from "./useApi";
import { useUsersStore, UserPagination } from "@store/useUsers";

export function useUsers(key: string) {
	const { mutate } = useSWRConfig();
	const { userCache, updateUserCache } = useUsersStore();
	const { data, isLoading, error } = useApi<UserPagination>(`users/server/${key}`, {
		refreshInterval: 10000,
		onSuccess: (data) => updateUserCache(data)
	});
	return {
		data,
		userCache,
		isLoading,
		mutate,
		error
	};
}
