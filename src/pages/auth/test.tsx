import React from "react";

import { AuthGate } from "@components/auth/AuthGate";
import { useUserInfo } from "@hooks/useUserInfo";

const test = () => {
	const { authCache, logout } = useUserInfo();
	return (
		<AuthGate>
			<div>
				username: {authCache.username}
				<div>
					<button onClick={logout}>logout</button>
				</div>
			</div>
		</AuthGate>
	);
};

export default test;
