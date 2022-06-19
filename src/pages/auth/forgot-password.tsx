import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Input from "@mui/material/Input";
import Alert from "@mui/material/Alert";

import { constants, errorHandler, nextBackend } from "@utils";
import { AppLink } from "@components/AppLink";

const Spinner = ({ visible }: { visible: boolean }) => {
	if (!visible) return null;
	return <CircularProgress size={20} style={{ color: constants.THEME.WHITE }} />;
};

export const ForgotPassword = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [body, setBody] = useState({ username: "", email: "" });
	const [success, setSuccess] = useState(false);
	const formValid = body.username.length > 0 && body.email.length > 0;

	async function ResetPassword() {
		try {
			setIsLoading(true);
			await nextBackend.post<{ ok: boolean }>("clients/password-reset", { body });
			setBody({ username: "", email: "" });
			setSuccess(true);
			setIsLoading(false);
		} catch (error) {
			setBody({ username: "", email: "" });
			setIsLoading(false);
			errorHandler(error);
		}
	}

	return (
		<div className="max-w-[700px] min-h-screen pt-5 pb-5 m-auto px-5 mr-auto text-center">
			<Card style={{ backgroundColor: constants.THEME.BLACK }}>
				<CardContent>
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
							type="email"
							value={body.email}
							onChange={({ target }) => setBody({ ...body, email: target.value.trim() })}
							fullWidth
							className="text-theme-gray max-w-[250px]"
							placeholder="email"
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
							onClick={ResetPassword}
							endIcon={<Spinner visible={isLoading} />}
						>
							Send Recovery Email
						</Button>
					</div>
					<div className="pt-5">
						<AppLink href="/auth/login">LOGIN</AppLink>
					</div>
				</CardContent>
			</Card>
			{
				success && (
					<Alert style={{ background: constants.THEME.GREEN }}
						severity="success">
						Password reset email sent! Please check your inbox or spam.
					</Alert>
				)
			}
		</div>
	);
};

export default ForgotPassword;
