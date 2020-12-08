/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-11-19 14:49:36
 * @LastEditors  : liulib
 * @LastEditTime : 2020-11-19 16:37:44
 */
const path = require('path')

const config = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './dist')
    },

    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.join(__dirname, './node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}

module.exports = config
