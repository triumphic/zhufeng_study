const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',    //以src/index.js 作为打包入口
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: "source-map",      //可以产生source-map文件
    // source: {   // 更改解析模块的查找方式   先找source文件夹下，若没有再找node_modules
    //     modules: [path.resolve(__dirname, 'source'), path.resolve('node_modules')]
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ]
}