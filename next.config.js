const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: (config, { dev }) => {
		config.plugins.push(
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
			})
		);
		return config;
	},
	images: {
		domains: ['firebasestorage.googleapis.com'],
		formats: ['image/avif', 'image/webp'],
	},
};

module.exports = nextConfig;
