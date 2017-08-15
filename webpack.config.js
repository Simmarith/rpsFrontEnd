var path = require('path');

module.exports = {
    entry: './src/App.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loaders: 'babel-loader',
                include: [
                    path.resolve(__dirname, "src")
                ],
                enforce: "pre",
                enforce: "post",
            },

        ]
    }
}
