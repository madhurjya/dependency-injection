import baseConfig from './webpack.base.babel';

export default Object.assign({}, baseConfig, {
    devtool: 'source-map'
});