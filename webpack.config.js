// js 多入口问题
// 配置输出文件
// webpack 提取公共模块
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量的配置 dev / prod
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);


// 获取htlmplugin的方法
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/'+name+'.html',
        filename: 'view/'+name+'.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]  // 这个html同时需要引入commonjs 和index.js文件(本页面的index文件)
    }
}
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],   // 如果直接打包会打包成common.js 文件
        'index': ['./src/page/index/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'result': ['./src/page/result/index.js']
    },
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    // webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问
    //
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.scss$/,
                loader:  ExtractTextPlugin.extract("style-loader","css-loader!sass-loader")
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader:  "url-loader?limit=100&name=resource/[name].[ext]"
            },
            {
                test: /\.matt$/,
                loader:  "html-loader"
            }
        ]
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    plugins: [
        // 独立通用模块 到 js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // plugins 的name 指向common就会把common打包到base.js中
            filename: 'js/base.js'
        }),
        // 吧css单独打包到文件
        new ExtractTextPlugin("css/[name].css"),
        // html 模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
    ]
};

if  (WEBPACK_ENV === 'dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;