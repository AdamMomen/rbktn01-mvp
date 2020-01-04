const path = require('path')
module.exports = {

    entry: path.join(__dirname, '/client/src/components/app.jsx')
    //'./client/src/components'
    ,
    module: {
        rules: [
            {
                test: /\.(jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            }, {
                test: /\.(sass||css)$/,
                use: ["css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    // 'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
    output: {
        path: path.join(__dirname, 'client/dist'),
        filename: 'bundle.js'
    }
}
