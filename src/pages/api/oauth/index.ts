import type { NextApiRequest, NextApiResponse } from "next";

import { config, cookie } from "@utils";
import { oauth } from "@utils";

export default async function getOauthRedirect(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") throw "method not allowed";
		const token = cookie.getCookie(req);
		if (!token) {
			res.redirect(307, `${config.NEXT_PUBLIC_DOMAIN}/auth/login`);
			return;
		}
		const redirect_url = oauth.buildRedirect(token);
		res.status(200).json({ redirect_url });
	} catch (error) {
		res.status(500).json({ error });
	}
}
