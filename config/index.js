const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {merge} = require('webpack-merge');

const {getFullUrl, setFileLocationInit, getNetworkIp} = require('./config');
const commonFun = require('./webpack.common.config');
const devFun = require('./webpack.dev.config');
const proFun = require('./webpack.pro.config');

const config = {
    publicPath: './',
    assetsDir: 'static',
    port: '3333',
    include: [getFullUrl('src')],
    exclude: [/node_modules/],
    networkIp: getNetworkIp(),
    globalLessData: getFullUrl('src/assets/style/params.less'),
    pageTitle: 'react',
};

module.exports = (env, argv) => {

    const isDev = argv.mode === 'development';
    const setFileLocation = (fileName) => {
        const assetsDir = config.assetsDir;
        return assetsDir ? `${assetsDir}/${setFileLocationInit(fileName)}` : setFileLocationInit(fileName);
    };

    config.sourceMap = isDev;
    config.isDev = isDev;
    config.setFileLocation = setFileLocation;
    config.getFullUrl = getFullUrl;

    const commonObj = commonFun(env, argv, config);
    const devObj = devFun(env, argv, config);
    const proObj = proFun(env, argv, config);

    const obj = isDev ? merge(commonObj, devObj) : merge(commonObj, proObj);

    // obj.plugins.push(
    //     new BundleAnalyzerPlugin(),
    // );

    // const obj = commonObj;
    // console.log(obj)
    return obj;
}
