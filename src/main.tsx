import React from 'react';
import ReactDom from 'react-dom';
import {RouterView} from '@/router';


try {

    const Main = () => {


        return (
            // 渲染路由页面
            <RouterView/>
        );
    }

    ReactDom.render(<Main />, document.getElementById('root'));

} catch (error) {
    console.error(error);
}
