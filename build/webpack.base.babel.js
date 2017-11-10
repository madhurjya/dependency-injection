import path from 'path';

export default {
    context: path.resolve(__dirname, '../src'),
    entry: {
        index: './index.js'
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: 'dependency-injection',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: (/node_modules/),
            }
        ]
    }
};