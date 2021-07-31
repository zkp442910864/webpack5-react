import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from '@/store';
import {RouterView} from '@/router';
import '@/assets/style/index.less';

// 主入口
const Main = () => {

    return (
        // 仓库
        <Provider store={store}>
            {/* 渲染路由页面 */}
            <RouterView/>
        </Provider>
    );
};

// window.store = store;
console.log(process.env.CUSTOM_NODE_ENV);
ReactDom.render(<Main />, document.getElementById('root'));
