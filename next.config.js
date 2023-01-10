/**
 * @type {import('next').NextConfig}
 */

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

module.exports = nextConfig;

