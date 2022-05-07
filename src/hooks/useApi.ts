import useSWR from "swr";

import { NEXT_PUBLIC_BACKEND_API } from "src/utils/config";

type UseApi<T> = {
	data: T
	isLoading: boolean
	error: string
}

type UseApiConfig<T> = {
	refreshInterval?: number
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (error: any, key: string) => void
	onSuccess?: (data: T, key: string) => void
}

async function fetcher<T>(key = "") {
	const response = await fetch(`${NEXT_PUBLIC_BACKEND_API}/${key}`, {
		method: "GET",
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.error ?? "internal server error");
	}
	return data as T;
}

export function useApi<T>(key?: string, options?: UseApiConfig<T>): UseApi<T> {
	const { data, error } = useSWR(key, () => fetcher<T>(key), {
		refreshInterval: 5000,
		...options
	});

	return {
		data: data as T,
		isLoading: !error && !data,
		error
	};
}
