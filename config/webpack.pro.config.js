
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');


module.exports = (env, argv, config) => {
    const {
        publicPath,
        sourceMap,
        include,
        exclude,
        port,
        networkIp,
        globalLessData,
        pageTitle,
        assetsDir,
        setFileLocation,
        isDev,
        getFullUrl
    } = config;

    return {
        plugins: [
            new CleanWebpackPlugin(),
            new WebpackManifestPlugin(),
            // 开启 gzip
            new CompressionWebpackPlugin(),
        ],
        optimization: {
            minimizer: [
                new UglifyJsWebpackPlugin({
                    // cache: true,   // 开启缓存
                    // parallel: true, // 开启多线程编译
                    // sourceMap: true,  // 是否sourceMap
                    // uglifyOptions: {  // 丑化参数
                    //     comments: false,
                    //     warnings: false,
                    //     compress: {
                    //         unused: true,
                    //         dead_code: true,
                    //         collapse_vars: true,
                    //         reduce_vars: true
                    //     },
                    //     output: {
                    //         comments: false
                    //     }
                    // }
                }),
                new OptimizeCssAssetsWebpackPlugin(),
            ]
        }
    };
};


