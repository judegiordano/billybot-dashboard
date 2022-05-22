import toast from "react-hot-toast";
import { useRouter } from "next/router";

import { useApi } from "./useApi";
import { Auth, useAuthStore } from "@store/useAuth";

export function useUserInfo() {
	const { push } = useRouter();
	const { authCache, updateAuthCache, clearAuthCache } = useAuthStore();
	const params = new URLSearchParams({ access_token: authCache.access_token as string }).toString();
	const { data, isLoading, error } = useApi<Auth>(`oauth/me?${params}`, {
		refreshInterval: 30_000,
		onSuccess: (data) => updateAuthCache({ ...authCache, ...data }),
		onError: (error) => {
			toast.error(error.toString());
			updateAuthCache({ ...authCache });
		}
	});

	const logout = async () => {
		clearAuthCache();
		await push("/");
	};

	return {
		data,
		authCache,
		clearAuthCache,
		isLoading,
		error,
		logout
	};
}
