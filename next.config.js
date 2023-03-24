/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        api: 'http://localhost:8000/api',
    },
}

module.exports = nextConfig
