import React from "react";

import { AppLink } from "@components/AppLink";

const NotFound: React.FC = (): JSX.Element => {
	return (
		<div className="m-auto text-center">
			<div className="m-auto border-b-2 border-gray-200 max-w-[200px] pb-3">
				<h1 className="font-medium text-8xl">
					404
				</h1>
			</div>
			<h3 className="pt-3 text-xl">the requested page does not exist</h3>
			<h3 className="pt-3 text-xl">maybe try going <AppLink href="/">home</AppLink></h3>
		</div>
	);
};

export default NotFound;
