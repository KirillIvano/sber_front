const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            vars: path.resolve(__dirname, 'src', 'common')
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: false,
        }),
        new webpack.DefinePlugin({
            __HTTP_API_ORIGIN__: '"http://training-assistant-app.herokuapp.com"',
            __WS_API_ORIGIN__: '"ws://training-assistant-app.herokuapp.com"',
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                            transpileOnly: true
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule: true,
                },
            },
        ],
    },
};
