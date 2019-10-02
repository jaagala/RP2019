const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "none",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CopyPlugin([{
            from: "public"
        }])
    ]
};