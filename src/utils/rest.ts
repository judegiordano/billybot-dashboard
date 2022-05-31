import { NEXT_PUBLIC_BACKEND_API, NEXT_PUBLIC_DOMAIN } from "./config";

type RequestOptions = {
	params?: Record<string, string>
	headers?: Record<string, string>
	credentials?: "include" | "omit" | "same-origin"
	body?: Record<string, string>
}

type FetchError = {
	ok?: boolean
	status?: number
	error?: string
}

export class RestApi {
	private url: string;
	private baseHeaders: Record<string, string>;

	constructor(url: string, options?: RequestOptions) {
		this.url = url;
		this.baseHeaders = {
			"content-type": "application/json",
			...options?.headers
		};
	}

	public async get<T>(path?: string, options?: RequestOptions) {
		const params = options?.params && new URLSearchParams(options.params).toString();
		const url = `${this.url}${path ? `/${path}` : ""}${params ? `?${params}` : ""}`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
				...(this.baseHeaders),
				...options?.headers
			},
			credentials: options?.credentials
		});
		if (response.redirected) window.location.href = response.url;
		const data = await response.json() as FetchError;
		if (!response.ok) {
			throw data.error ?? "internal server error";
		}
		return data as T;
	}

	public async post<T>(path?: string, options?: RequestOptions) {
		const params = options?.params && new URLSearchParams(options.params).toString();
		const url = `${this.url}${path ? `/${path}` : ""}${params ? `?${params}` : ""}`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				...(this.baseHeaders),
				...options?.headers
			},
			credentials: options?.credentials,
			body: JSON.stringify(options?.body)
		});
		if (response.redirected) window.location.href = response.url;
		const data = await response.json() as FetchError;
		if (!response.ok) {
			throw data.error ?? "internal server error";
		}
		return data as T;
	}
}

export const nextBackend = new RestApi(`${NEXT_PUBLIC_DOMAIN}/api`);
export const backendApi = new RestApi(NEXT_PUBLIC_BACKEND_API);
