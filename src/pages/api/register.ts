import type { NextApiRequest, NextApiResponse } from "next";
import type { IClient } from "btbot-types";

import { cookie } from "@utils";
import { backendApi } from "@utils";

export default async function register(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") throw "method not allowed";
		const { email, username, password } = req.body;
		const { token, client } = await backendApi.post<{ token: string, client: IClient }>("clients/register", {
			body: { username, email, password }
		});
		cookie.setCookie(res, token);
		res.json(client);
	} catch (error) {
		res.status(500).json({ error });
	}
}
