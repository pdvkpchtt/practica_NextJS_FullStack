/** @type {import('next').NextConfig} */
var path = require('path')
const nextConfig = {
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						svgoConfig: {
							plugins: [
								{
									name: 'preset-default',
									params: {
										overrides: {
											cleanupIds: false,
											removeViewBox: false,
										},
									},
								},
								'removeXMLNS',
							],
						},
					},
				},
			],
		})

		return config
	},
	reactStrictMode: false,

	experimental: {
		appDir: true,
		serverActions: {
			bodySizeLimit: '15mb',
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	webpack: (config, { isServer }) => {
		config.resolve.alias['@'] = path.join(__dirname, 'src')
		return config
	},
}

module.exports = nextConfig
