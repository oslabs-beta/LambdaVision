const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        host: 'localhost',
        port: 8080,
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        hot: true,
        open:true,
        historyApiFallback: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:3000',
                secure: false,
                changeOrigin: true
            },
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use:['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
};