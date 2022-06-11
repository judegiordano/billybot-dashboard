import React from "react";
import { AppLink } from "./AppLink";

import { config } from "@utils";

export const BackButton = ({ server_id }: { server_id: string }) => {
	return (
		<div className="pt-2 pb-2">
			<AppLink href={`${config.NEXT_PUBLIC_DOMAIN}/user/server/${server_id}`} >
				&#x3C; BACK
			</AppLink>
		</div>
	);
};
