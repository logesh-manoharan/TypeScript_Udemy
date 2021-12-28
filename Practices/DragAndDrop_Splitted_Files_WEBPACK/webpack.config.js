const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',  // to debug the code in the BROWSER
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }            
        ]        
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    // configure the DEV SERVER in the following way
    devServer: {
        static: {
            directory: path.join(__dirname, '/'),
        },
        compress: true,
        port: 9000,
    },
}