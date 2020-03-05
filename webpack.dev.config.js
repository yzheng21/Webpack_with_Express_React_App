const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const srcRoot = path.resolve(__dirname, 'src');
const htmlTemplatePath = path.resolve(srcRoot, 'index.html');

function getHtmlArray() {
    return [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: htmlTemplatePath,
        chunks: 'index'
    })];
}

const htmlArray = getHtmlArray();

module.exports = {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'index.js'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: [{loader: 'babel-loader'}], include: srcRoot},
            { test: /\.css$/ , use:['style-loader',{'loader':'css-loader',options:{minimize: true}}], include: srcRoot},
            { test: /\.scss$/ , use:['style-loader','css-loader','sass-loader'], include: srcRoot}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ].concat(htmlArray),
}