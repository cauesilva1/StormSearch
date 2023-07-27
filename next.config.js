/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['openweathermap.org'],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
