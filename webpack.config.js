
const os = require('os');
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// 获得完整路径
const getFullUrl = (url) => {
    return path.resolve(__dirname, '.', url);
};

// 获取ip地址
const getNetworkIp = () => {
    let needHost = ''; // 打开的host
    try {
        // 获得网络接口列表
        let network = os.networkInterfaces();
        for (let dev in network) {
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    return needHost;
};

const config = {
    sourceMap: true,
    publicPath: './',
    port: '3333',
    include: [getFullUrl('src')],
    exclude: [/node_modules/],
    networkIp: getNetworkIp()
};


module.exports = (env, argv) => {
    const {publicPath, sourceMap, include, exclude, port, networkIp} = config;
    // console.log(env, argv);
    // console.log(process.env);

    return {
        devtool: 'eval-source-map',
        entry: getFullUrl('src/main.tsx'),
        output: {
            path: getFullUrl('dist'),
            publicPath,
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|ts)$/,
                    include,
                    exclude,
                    use: [
                        // {
                        //     loader: 'ts-loader',
                        // },
                        {
                            loader: 'babel-loader',
                        },
                        {
                            loader: 'eslint-loader',
                            options: {
                                cache: true,
                                quiet: true
                            }
                        }
                    ],
                },
                {
                    test: /\.(less|css)$/,
                    use: [
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap
                            },
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap
                            },
                        },
                    ]
                }
            ],
        },
        plugins: [
            // new CleanWebpackPlugin(['dist']),
            new WebpackBar({
                name: '编译进度',
                basic: false,
                // profile: true
            }),
            new FriendlyErrorsWebpackPlugin({
                // 成功的时候输出
                compilationSuccessInfo: {
                    messages: [`本地地址: http://localhost:${port} \n    IP 地 址: http://${networkIp}:${port}`],
                    // notes: ['123']
                },
                // 是否每次都清空控制台
                clearConsole: true,
            }),
            new HtmlWebpackPlugin({
                template: getFullUrl('public/index.html'),
                title: 'react',
                hash: true,
                filename: getFullUrl('dist/index.html'),
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    CUSTOM_NODE_ENV: JSON.stringify(env.CUSTOM_NODE_ENV)
                }
            }),
        ],
        devServer: {
            // webpack-dev-server 会从 output.path 中定义的目录为服务提供 bundle 文件，即，文件将可以通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问。
            // 貌似设置成绝对路径才能正常加载页面
            publicPath: '/',
            // 文件目录
            // contentBase: getFullUrl('dist'),
            open: false,
            port,
            // host: 'localhost',
            // host: networkIp,
            host: '0.0.0.0',
            useLocalIp: true,
            inline: true,
            stats: 'errors-only',
            quiet: true
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': getFullUrl('src')
            }
        },
    };
};


