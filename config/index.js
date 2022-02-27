const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {merge} = require('webpack-merge');

const {getFullUrl, setFileLocationInit, getNetworkIp, setAssetsPublicPath} = require('./config');
const commonFun = require('./webpack.common.config');
const devFun = require('./webpack.dev.config');
const proFun = require('./webpack.pro.config');

const config = {
    /**
     * 文件中的路径方式，相对或绝对
     */
    publicPath: './',
    /**
     * 输出的资源文件夹
     */
    assetsDir: 'static',
    /**
     * 端口
     */
    port: '3333',
    /**
     * 需要处理的文件
     */
    include: [getFullUrl('src')],
    /**
     * 排除处理的文件
     */
    exclude: [/node_modules/],
    /**
     * 启动服务的ip地址
     */
    networkIp: getNetworkIp(),
    /**
     * 全局 less 参数
     */
    globalLessData: getFullUrl('src/assets/style/params.less'),
    /**
     * 页面title
     */
    pageTitle: 'react',
};

module.exports = (env, argv) => {
    // console.log(env);

    const isDev = argv.mode === 'development';
    const setFileLocation = (fileName) => {
        const assetsDir = config.assetsDir;
        return assetsDir ? `${assetsDir}/${setFileLocationInit(fileName)}` : setFileLocationInit(fileName);
    };

    config.sourceMap = isDev;
    config.isDev = isDev;
    config.setFileLocation = setFileLocation;
    config.setAssetsPublicPath = setAssetsPublicPath;
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
};
