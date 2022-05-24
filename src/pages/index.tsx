import React, { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";

import { constants, config } from "@utils";

const Spinner = ({ visible }: { visible: boolean }) => {
	if (!visible) return null;
	return <CircularProgress size={20} style={{ color: constants.THEME.WHITE }} />;
};

export const Home = () => {
	const { push } = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function getRedirect() {
		setIsLoading(true);
		const response = await fetch(`${config.NEXT_PUBLIC_BACKEND_API}/oauth`, {
			method: "GET",
		});
		const data = await response.json();
		if (!response.ok) {
			setIsLoading(false);
			toast.error(data.error ?? "internal server error");
			return;
		}
		return data;
	}

	return (
		<div className="max-w-[500px] min-h-screen pt-5 pb-5 m-auto px-5 mr-auto text-center">
			<Card style={{ backgroundColor: constants.THEME.BLACK }}>
				<CardContent>
					<Button
						className="font-extrabold"
						style={{
							backgroundColor: constants.THEME.PURPLE,
							color: constants.THEME.WHITE
						}}
						disabled={isLoading}
						onClick={async () => {
							const { redirect_url } = await getRedirect() as { redirect_url: string };
							await push(redirect_url);
							setIsLoading(false);
						}}
						endIcon={<Spinner visible={isLoading} />}
					>
						login with discord
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default Home;
