import { DISCORD_CLIENT_ID, NEXT_PUBLIC_BACKEND_API, NEXT_PUBLIC_DISCORD_API } from "./config";

const scopes = ["identify", "guilds", "guilds.members.read"].join("%20");
const responseType = "code";

export const buildRedirect = (token: string) => {
	const redirect = encodeURI(`${NEXT_PUBLIC_BACKEND_API}/clients/oauth/redirect`);
	return `${NEXT_PUBLIC_DISCORD_API}/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${redirect}&response_type=${responseType}&scope=${scopes}&state=${token}`;
};
