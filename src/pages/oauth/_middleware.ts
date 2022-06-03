import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { config } from "@utils";

export async function middleware(req: NextRequest) {
	const response = NextResponse.next();
	const connected = req.nextUrl.searchParams.get("connection_status");
	if (!connected) return NextResponse.redirect(`${config.NEXT_PUBLIC_DOMAIN}/auth/login`, 307);
	return response;
}
