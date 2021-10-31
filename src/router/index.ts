import store from '@/store';
import {default as RouterView, setBeforeEach, setAfterEach} from './inbulk/RenderPage';
export {useRouter, getRouter} from './config';

// 路由前
setBeforeEach((next, target) => {
    // console.log('before');
    const isLoginUrl = target.match.path === '/login';
    const isLogin = window.localStorage.getItem('asd');

    // console.log(store.getState());

    switch (true) {
        // 未登录 未在登录页面
        // case !isLogin && !isLoginUrl:
        //     // next();
        //     next('/login', 'replace');
        //     break;
        // 登录了 在登录页面
        // case isLogin && isLoginUrl:
        //     next('/', 'replace');
        //     break;
        default:
            next();
            break;
    }
});

// 路由后
setAfterEach((target) => {
    console.log('after', target);
});

export {
    RouterView
};

