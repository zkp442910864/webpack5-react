import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import store from '@/store';
import {RouterView, getRouter} from '@/router';

import '@/assets/style/common.less';

export default () => {
    // 主入口
    const Main = () => {

        return (
            // 仓库
            <Provider store={store}>
                {/* 渲染路由页面 */}
                <RouterView />
                {/* <div id="funModules"></div> */}
            </Provider>
        );
    };

    if (process.env.CUSTOM_NODE_ENV === 'development') {
        global.store = store;
        global.getRouter = getRouter;
    }

    ReactDom.render(<Main />, document.getElementById('root'));
};
