import Image from "next/image";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { constants } from "@utils";

interface IErrorProps {
	message: string
}

export const Error: React.FC<IErrorProps> = ({
	message
}: IErrorProps): JSX.Element => {
	return (
		<div className="min-h-screen px-5 pt-10 m-auto text-center">
			<Card className="max-w-[600px] m-auto" style={{ backgroundColor: constants.THEME.BLACK }}>
				<CardContent>
					<div className="text-lg text-theme-red">
						{message}
					</div>
					<div className="pt-10 rounded-full">
						<Image
							draggable={false}
							alt="billy mad"
							className="rounded-full"
							src="/billy_mad.png"
							height={250}
							width={250}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
