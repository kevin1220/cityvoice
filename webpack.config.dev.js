var webpack = require('webpack');
var path = require('path');
var appname = "dev";
//加载一些插件 
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');

//定义了一些文件夹的路径
var SRC_PATH = './src';
var BUILD_PATH = './build/';

module.exports = {
    devtool: "source-map",
    entry: [
        SRC_PATH + "/js/main",
        'webpack-dev-server/client?http://127.0.0.1:3000',
        'webpack/hot/dev-server',
    ],
    output: {
        path: BUILD_PATH + "/" + appname,
        publicPath: '.',
        filename: "js/[name].min.js",
        chunkFilename: "/js/[name].min.js"
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'css?sourceMap?style'
                )
            },
            { test: /.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    resolve: {
        // extensions: ['', '.js', '.css'],
    },
    plugins: [
        new ExtractTextPlugin("css/index.css"),
        //添加我们的插件 会自动生成一个html文件
        new HtmlwebpackPlugin({
            filename: 'index.html',
            template: SRC_PATH + '/html/index.html',
            inject: true,
            hash: true,
        }),
        new HtmlwebpackPlugin({
            filename: 'load.html',
            template: SRC_PATH + '/html/load.html',
            inject: true,
            hash: true,
        }),
        // new webpack.optimize.UglifyJsPlugin({ //压缩代码
        //     compress: {
        //         warnings: false
        //     },
        //     except: ['$super', '$', 'exports', 'require'] //排除关键字
        // })
    ],
    devServer: {
        contentBase: 'build/'+appname,
        hot: true,
        port: 3000
    },
    watch:true
};
