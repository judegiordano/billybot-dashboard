import type { NextApiRequest, NextApiResponse } from "next";
import type { IClient } from "btbot-types";

import { backendApi, config, cookie } from "@utils";

export default async function refresh(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") throw "method not allowed";
		const authToken = cookie.getCookie(req);
		if (!authToken) {
			res.redirect(307, `${config.NEXT_PUBLIC_DOMAIN}/auth/login`);
			return;
		}
		const { token, client } = await backendApi.get<{ token: string, client: IClient }>("clients/refresh/client", {
			headers: {
				Authorization: `Bearer: ${authToken}`
			}
		});
		cookie.setCookie(res, token);
		res.status(200).json(client);
	} catch (error) {
		res.status(500).json({ error });
	}
}
