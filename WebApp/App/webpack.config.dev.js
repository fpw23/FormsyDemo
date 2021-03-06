var path = require('path');

module.exports = {
    context: path.join(__dirname, 'App'),
    entry: ['../main.jsx'],
    output: {
        path: path.join(__dirname, '..', '..', 'WebServer', 'content', 'js'),
        publicPath: "http://localhost:8082/content/js/",
        filename: "app.js",
        libraryTarget: "umd",
        library: "FormsyDemo"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react', 'react-hmre'] }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    externals: {
        "jquery": "$"
    }
};