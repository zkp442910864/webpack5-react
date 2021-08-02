
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
        cache: {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename],
            },
            version: '1.0'
        },
        plugins: [
        ],
        optimization: {
            moduleIds: 'named',
            chunkIds: 'named',
        },
        devServer: {
            // webpack-dev-server 会从 output.path 中定义的目录为服务提供 bundle 文件，即，文件将可以通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问。
            // 貌似设置成绝对路径才能正常加载页面
            publicPath: '/',
            open: false,
            port,
            host: '0.0.0.0',
            useLocalIp: true,
            inline: true,
            stats: 'errors-only',
            quiet: true
        },
    };
};

