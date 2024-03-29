// const path = require('path');

module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-regenerator',
        [
            'babel-plugin-react-scoped-css',
            {
                // exclude: [path.resolve(__dirname, '.', '/src/assets/style/common.less')],
                // 包含 common.less 都会被过滤
                // include: '^((?!common.less).)*.(sa|sc|le|c)ss$',
                // 只对带有 scoped 名称的起作用
                include: '.scoped.(sa|sc|le|c)ss$',
            },
        ],
    ],
};
