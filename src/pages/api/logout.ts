import type { NextApiRequest, NextApiResponse } from "next";

import { cookie } from "@utils";

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") throw "method not allowed";
		cookie.destroyCookie(res);
		res.json({ ok: true });
	} catch (error) {
		res.status(500).json({ error });
	}
}
