import React, { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Input from "@mui/material/Input";
import type { IClient } from "btbot-types";

import { config, constants, nextBackend } from "@utils";
import { useAuthStore } from "@store/useAuth";
import { AppLink } from "@components/AppLink";

const Spinner = ({ visible }: { visible: boolean }) => {
	if (!visible) return null;
	return <CircularProgress size={20} style={{ color: constants.THEME.WHITE }} />;
};

export const Login = () => {
	const { push } = useRouter();
	const { authCache, updateAuthCache } = useAuthStore();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [body, setBody] = useState({ username: "", password: "" });
	const formValid = body.username.length > 0 && body.password.length > 0;

	async function login() {
		try {
			setIsLoading(true);
			const client = await nextBackend.post<IClient>("login", { body });
			updateAuthCache({
				...authCache,
				username: client.username,
				email: client.email,
				connection_status: client.connection_status,
				auth_state: client.auth_state
			});
			await push(`${config.NEXT_PUBLIC_DOMAIN}/user`);
			setIsLoading(false);
		} catch (error) {
			setBody({ username: "", password: "" });
			setIsLoading(false);
			toast.error(error as string);
		}
	}

	return (
		<div className="max-w-[500px] min-h-screen pt-5 pb-5 m-auto px-5 mr-auto text-center">
			<Card style={{ backgroundColor: constants.THEME.BLACK }}>
				<CardContent>
					<div className="pt-5">
						<Input
							value={body.username}
							onChange={({ target }) => setBody({ ...body, username: target.value.trim() })}
							className="text-theme-gray"
							placeholder="username"
						/>
					</div>
					<div className="pt-5">
						<Input
							type="password"
							value={body.password}
							onChange={({ target }) => setBody({ ...body, password: target.value.trim() })}
							className="text-theme-gray"
							placeholder="password"
						/>
					</div>
					<div className="pt-5">
						<Button
							className="font-extrabold"
							style={{
								backgroundColor: formValid ? constants.THEME.PURPLE : "",
								color: constants.THEME.WHITE
							}}
							disabled={isLoading}
							onClick={login}
							endIcon={<Spinner visible={isLoading} />}
						>
							login
						</Button>
					</div>
					<div className="pt-5">
						<AppLink href="/auth/register">SIGN UP</AppLink>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
