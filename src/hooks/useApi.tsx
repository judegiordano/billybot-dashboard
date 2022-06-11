/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useSWR from "swr";

import { errorHandler, nextBackend } from "@utils";

export type UseApiConfig<T> = {
	refreshInterval?: number
	onError?: (error: any, key: string) => void
	onSuccess?: (data: T, key: string) => void
}

export function useApi<T>(url: string, options?: UseApiConfig<T>) {

	const [loading, setLoading] = useState<boolean>(true);

	async function fetcher<T>(url: string) {
		const data = await nextBackend.get<T>(url);
		setLoading(false);
		return data;
	}

	const { data, error } = useSWR(url, () => fetcher<T>(url), {
		refreshInterval: 10_000,
		onSuccess: () => setLoading(false),
		onError: (error) => {
			errorHandler(error);
			setLoading(false);
		},
		...options
	});

	return {
		data,
		error,
		loading,
		setLoading
	};
}
