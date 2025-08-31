/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['media.tenor.com', 'cdnl.iconscout.com', 'www.arrowheadgrp.com', 'c10.patreonusercontent.com', ],
    },
    eslint:{
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;

