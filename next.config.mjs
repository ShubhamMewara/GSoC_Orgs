/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/ads.txt',
                destination: '/ads',
            },
        ];
    }
};

export default nextConfig;
