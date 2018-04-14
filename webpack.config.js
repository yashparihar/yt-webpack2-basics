var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new extractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    entry: './src/js/app.js',
    output: {
        path : path.resolve(__dirname , 'dt'),
        filename: 'bundle.js',
        publicPath: "/dt"
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
            }
        ]
    },
    plugins: [
        extractPlugin
    ]
}