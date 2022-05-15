import React from "react";
import { Divider } from "@mui/material";

import { constants } from "@utils";

export const Separator: React.FC = (): JSX.Element => {
	return (
		<div className="mt-1 mb-1">
			<Divider style={{ backgroundColor: constants.THEME.GRAY }} />
		</div>
	);
};
