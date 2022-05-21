import React from "react";
import Head from "next/head";
import { SWRConfig } from "swr";

import "../styles/globals.css";
import { Notifications } from "@components/Notifications";

const provider = ((cache) => () => cache)(new Map());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps } : any ) {
	return (
		<>
			<SWRConfig value={{ provider }}>
				<Head>
					<title>BillyP Dashboard</title>
					<meta charSet="UTF-8" />
					<meta name="node application" content="A simple web application" />
					<meta name="keywords" content="HTML,CSS,XML,JavaScript" />
					<meta name="description" content="BillyP Dashboard" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="author" content="Jude Giordano" />
					<link rel="icon" href="/billy_mad.png" />
				</Head>
				<div className="font-content bg-theme-dark-black">
					<Component {...pageProps} />
				</div>
			</SWRConfig>
			<Notifications />
		</>
	);
}

export default MyApp;
