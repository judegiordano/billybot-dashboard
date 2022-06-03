module.exports = {
	swcMinify: false,
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
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.BACKEND_API}/:path*`
			},
		];
	},

};
