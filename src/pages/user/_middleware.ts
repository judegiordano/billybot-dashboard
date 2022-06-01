import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { IClient } from "btbot-types";

import { backendApi, config } from "@utils";

function destroyCookie(res: NextResponse) {
	res.cookie(config.NEXT_PUBLIC_COOKIE_NAME, "", {
		path: "/",
		maxAge: 0,
		httpOnly: true,
		sameSite: true,
		secure: false
	});
}

export async function middleware(req: NextRequest) {
	const response = NextResponse.next();
	const token = req.cookies[config.NEXT_PUBLIC_COOKIE_NAME];
	try {
		if (!token) throw "unauthorized";
		const body = { token };
		await backendApi.post<IClient>("clients/refresh/token", { body });
		return response;
	} catch (error) {
		destroyCookie(response);
		return NextResponse.redirect(`${config.NEXT_PUBLIC_DOMAIN}/auth/login`, 307);
	}
}
