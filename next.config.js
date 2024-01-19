/** @type {import('next').NextConfig} */
const webpack = require('webpack');

const { parsed: appEnv } = require('dotenv').config({
  path: `./.env.${process.env.NODE_ENV}`,
});

const defaultEnv = {
  HOST: 'https://scrumanac.com',
};

const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new webpack.EnvironmentPlugin({ ...defaultEnv, ...appEnv })
    );
    return config;
  },
  images: {
    domains: ['www.imdb.com', 'placehold.co'],
  },
  eslint: {
    dirs: ['pages', 'components', 'libs', 'hooks'],
  },
  reactStrictMode: false,
  transpilePackages: ['react-hotjar'],
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
    '@material-ui/core/': {
      transform: '@material-ui/core/{{member}}',
    },
    '@material-ui/lab/': {
      transform: '@material-ui/lab/{{member}}',
    },
    '@material-ui/icons/?(((\\w*)?/?)*)': {
      transform: '@material-ui/icons/{{ matches.[1] }}/{{member}}',
    },
  },
};

module.exports = nextConfig;
