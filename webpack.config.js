// js 多入口问题
// 配置输出文件
// webpack 提取公共模块
var webpack = require('webpack');
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],   // 如果直接打包会打包成common.js 文件
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // plugins 的name 指向common就会把common打包到base.js中
            filename: 'js/base.js'
        })
    ]
};

module.exports = config;