module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	trailingSlash: false,
	poweredByHeader: false,
	images: {
		domains: [
			"cdn.discordapp.com"
		]
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});
		return config;
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/user",
				permanent: false,
			},
		];
	},
};
