import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Input from "@mui/material/Input";
import type { IClient } from "btbot-types";

import { config, constants, errorHandler, nextBackend } from "@utils";
import { useAuthStore } from "@hooks/useAuth";
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
			const client = await nextBackend.post<IClient>("clients/login", { body });
			updateAuthCache({ ...authCache, ...client });
			await push(`${config.NEXT_PUBLIC_DOMAIN}/user`);
			setIsLoading(false);
		} catch (error) {
			setBody({ username: "", password: "" });
			setIsLoading(false);
			errorHandler(error);
		}
	}

	return (
		<div className="max-w-[700px] min-h-screen pt-5 pb-5 m-auto px-5 mr-auto text-center">
			<Card style={{ backgroundColor: constants.THEME.BLACK }}>
				<CardContent>
					<form>
						<div className="pt-5">
							<Input
								fullWidth
								className="text-theme-gray max-w-[250px]"
								value={body.username}
								onChange={({ target }) => setBody({ ...body, username: target.value.trim() })}
								placeholder="username"
							/>
						</div>
						<div className="pt-5">
							<Input
								type="password"
								value={body.password}
								onChange={({ target }) => setBody({ ...body, password: target.value.trim() })}
								fullWidth
								className="text-theme-gray max-w-[250px]"
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
								disabled={!formValid || isLoading}
								onClick={login}
								endIcon={<Spinner visible={isLoading} />}
								type="submit"
							>
							login
							</Button>
						</div>
					</form>
					<div className="pt-5">
						<AppLink href="/auth/register">SIGN UP</AppLink>
					</div>
					<div className="pt-5">
						<AppLink href="/auth/forgot-password">FORGOT PASSWORD</AppLink>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
