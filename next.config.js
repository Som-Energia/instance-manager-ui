/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        api: 'http://localhost:8000/api',
        websocketApi: 'ws://localhost:8000/api',
        domain: 'example.com',
        nodeIp: '192.168.49.2',
    },
}

module.exports = nextConfig
