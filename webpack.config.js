var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new extractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    entry: {
        appa: './src/js/app.js',
    },
    output: {
        path : path.resolve(__dirname , 'dt'),
        filename: 'bundle.js',
       // publicPath: "/dt"
    },
    module: {
        rules : [
            {
                test: /\.js$/,
                use : [
                    {
                        loader : 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use : extractPlugin.extract({
                    use : ['css-loader' , 'sass-loader']
                })
            },

            {
                test: /\.html$/,
                use: [ 'html-loader']
            },
            {
                test:  /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            },
            {
                test:  /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ],
                exclude: path.resolve(__dirname,'src/index.html')
            }


        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $ : 'jquery',
            jQuery: 'jquery'
        }),
        extractPlugin,
        // new HtmlWebpackPlugin({
        //     filename: 'users.html',
        //     template: 'src/users.html',
        //     chunks:['appb']
        // }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dt'])
    ]
}