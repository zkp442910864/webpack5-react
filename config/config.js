const os = require('os');
const path = require('path');

// 获得完整路径
const getFullUrl = (url) => {
    return path.resolve(__dirname, '../', url);
};

// 设置文件存放位置
const setFileLocationInit = (fileName) => {
    switch (true) {
        case /.js$/.test(fileName):
            return `js/${fileName}`;
        case /.css$/.test(fileName):
            return `css/${fileName}`;
        case '[name].[sha512:hash:base64:7].[ext]' === fileName:
            return `img/${fileName}`;
        case '[name].[sha512:hash:base64:8].[ext]' === fileName:
            return `font/${fileName}`;
        default:
            return fileName;
    }
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

module.exports = {
    getNetworkIp,
    setFileLocationInit,
    getFullUrl,
}
