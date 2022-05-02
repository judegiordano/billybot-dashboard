import { config } from "@utils";
import { IApiError, IServerMetadata } from "@types";

export const getServerData = async (serverId: string) => {
	const response = await fetch(`${config.BACKEND_API}/server/${serverId}`, {
		method: "GET",
		headers: {
			"authorization": `Bearer ${config.BACKEND_TOKEN}`,
			"x-api-timestamp": new Date().getTime().toString()
		}
	});
	const data = await response.json();
	return data as IServerMetadata & IApiError;
};
