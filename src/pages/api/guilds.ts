import type { NextApiRequest, NextApiResponse } from "next";
import type { IServer } from "btbot-types";

import { config, cookie } from "@utils";
import { backendApi } from "@utils";

export default async function guilds(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") throw "method not allowed";
		const token = cookie.getCookie(req);
		if (!token) {
			res.redirect(307, `${config.NEXT_PUBLIC_DOMAIN}/auth/login`);
			return;
		}
		const data = await backendApi.get<IServer[]>("clients/guilds", {
			headers: {
				Authorization: `Bearer: ${token}`
			}
		});
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error });
	}
}
