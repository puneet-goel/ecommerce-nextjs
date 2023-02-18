/**
 * @type {import('next').NextConfig}
 */
const { withPlaiceholder } = require('@plaiceholder/next');

const nextConfig = {
	reactStrictMode: true,
	trailingSlash: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '/puneet-cloud/image/upload/**',
			},
		],
	},
};

module.exports = withPlaiceholder(nextConfig);
