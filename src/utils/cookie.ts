import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

import { config } from "@utils";

export const cookieName = config.NEXT_PUBLIC_COOKIE_NAME;

export function setCookie(res: NextApiResponse, token: string) {
	res.setHeader("Set-Cookie", serialize(cookieName, token, {
		httpOnly: true,
		path: "/",
		maxAge: 60 * 60 * 24 * 7, // 7 days
		secure: false,
		sameSite: true
	}));
}

export function getCookie(req: NextApiRequest) {
	return req.cookies[cookieName];
}

export function destroyCookie(res: NextApiResponse) {
	res.setHeader("Set-Cookie", serialize(cookieName, "", {
		httpOnly: true,
		path: "/",
		maxAge: 0,
		secure: false,
		sameSite: true
	}));
}
