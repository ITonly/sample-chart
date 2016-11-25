var bundler = require('nativescript-dev-webpack');
var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var stripConsole = require('./config/remove-console.js');

var buildEnv;

if (process.env.ENV_NODE === 'production') {
    buildEnv = {
        IDENTITY_URL: 'https://api-identity.guanplus.com',
        RESOURCE_URL: 'https://api-accounting.guanplus.com'
    };
} else if (process.env.ENV_NODE === 'stage') {
    buildEnv = {
        IDENTITY_URL: 'https://api-identity-stage.guanplus.com',
        RESOURCE_URL: 'https://api-accounting-stage.guanplus.com'
    };
} else if (process.env.ENV_NODE === 'development') {
    buildEnv = {
        IDENTITY_URL: 'https://api-identity-stage.guanplus.com',
        RESOURCE_URL: 'https://api-accounting-stage.guanplus.com'
    };
} else {
    buildEnv = {
        IDENTITY_URL: 'https://api-identity-stage.guanplus.com',
        RESOURCE_URL: 'https://api-accounting-stage.guanplus.com'
    };
}

module.exports = bundler.getConfig({
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", "." + process.env.OS + ".js", ".js"]
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
        fallback: [
            path.resolve(__dirname, 'config'),
        ]
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['remove-console'],
            exclude: [/bundles/, /tns-core-modules/,/nativescript/
            ]
        }, {
            test: /\.(html|css)$/,
            loader: 'raw-loader'
        }]
    },
    'uglify-loader': {
        mangle: false
    },
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.DefinePlugin({
            IDENTITY_URL: JSON.stringify(buildEnv.IDENTITY_URL),
            RESOURCE_URL: JSON.stringify(buildEnv.RESOURCE_URL),
            ENVIRONMENT: JSON.stringify(process.env.ENV_NODE)
        }),
        new webpack.optimize.DedupePlugin()]
});
