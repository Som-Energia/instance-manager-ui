/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        api: 'http://localhost:8000/api',
        nodeIp: '192.168.49.2',
    },
}

module.exports = nextConfig
