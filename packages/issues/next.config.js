/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const withTM = require('next-transpile-modules')(['@taskany/core']);

module.exports = withTM({
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                react: path.resolve(__dirname, 'node_modules/react'),
                'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
                'styled-components': path.resolve(__dirname, 'node_modules/styled-components'),
            },
        };

        return config;
    },
});
