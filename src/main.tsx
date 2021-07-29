import React from 'react';
import ReactDom from 'react-dom';
import {RouterView} from '@/router';
import {Provider} from 'react-redux';
import store from '@/store';

// 主入口
const Main = () => {

    return (
        // 仓库
        <Provider store={store}>
            {/* 渲染路由页面 */}
            <RouterView/>
        </Provider>
    );
}

// window.store = store;
ReactDom.render(<Main />, document.getElementById('root'));
