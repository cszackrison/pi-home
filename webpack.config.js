const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    mode: isDevelopment ? 'development' : 'production',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
		open: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ],
    },
    plugins: [
		new HtmlWebpackPlugin({ title: 'Multiple Choice' }),
        new HtmlWebpackTagsPlugin({ append: false, links: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap' }),
		!isDevelopment && new CopyWebpackPlugin({ patterns: [ 'schema.json', 'imsmanifest.xml', { context: 'node_modules/@allencomm/datatracking/build/SCORM/SCORM_2004', from: '*', to: './' } ] }),
        isDevelopment && new ReactRefreshPlugin()
    ].filter(Boolean)
};
