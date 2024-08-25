/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rotekurve.s3.eu-north-1.amazonaws.com',
                pathname: '/**'
            }
        ]
    },
};
