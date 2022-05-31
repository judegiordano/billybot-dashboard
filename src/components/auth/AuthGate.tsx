import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import toast from "react-hot-toast";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";

import { config, nextBackend } from "@utils";
import { useAuth, useAuthStore, IAuthUser } from "@hooks/useAuth";

interface IAuthGateProps {
	children: React.ReactNode
}

const buildAvatarUrl = (user_id?: string, avatar?: string) => {
	if (!avatar && !user_id) return "/default_profile.png";
	return `https://cdn.discordapp.com/avatars/${user_id}/${avatar}.png`;
};

export const UserAvatar = ({ auth_state }: { auth_state?: IAuthUser["auth_state"] }) => {
	const { push } = useRouter();
	const { clearAuthCache } = useAuthStore();
	const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | null>(null);

	const title = auth_state?.username ? `signed in as ${auth_state.username}#${auth_state.discriminator}` : "no account connected";

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget);
	};
	async function connectAccount() {
		try {
			const data = await nextBackend.get<{ redirect_url: string }>("oauth");
			await push(data.redirect_url);
			return;
		} catch (error) {
			toast.error(error as string);
		}
	}
	async function logout() {
		try {
			await nextBackend.post("logout");
			clearAuthCache();
			await push(`${config.NEXT_PUBLIC_DOMAIN}/auth/login`);
		} catch (error) {
			toast.error(error as string);
		}
	}
	async function home() {
		await push(`${config.NEXT_PUBLIC_DOMAIN}/user`);
		return;
	}

	return (
		<Toolbar>
			<div className="inline-flex align-middle">
				<Tooltip title={title}>
					<IconButton onClick={handleMenu} >
						<Image
							className="rounded-full"
							width={50}
							height={50}
							src={buildAvatarUrl(auth_state?.user_id, auth_state?.avatar)}
						/>
					</IconButton>
				</Tooltip>
				<Menu
					anchorEl={anchorEl}
					keepMounted
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					transformOrigin={{ vertical: "top", horizontal: "right" }}
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={home}>Home</MenuItem>
					<MenuItem onClick={connectAccount}>Connect Account</MenuItem>
					<MenuItem onClick={logout}>Logout</MenuItem>
				</Menu>
			</div>
		</Toolbar>
	);
};

export const AuthGate = ({ children }: IAuthGateProps) => {
	const { authCache } = useAuth();
	return (
		<>
			<div className="bg-theme-black">
				<UserAvatar auth_state={authCache?.auth_state} />
			</div>
			{children}
		</>
	);
};
