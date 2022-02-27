import Home from '@/views/home';
import Page404 from '@/views/Page404';
// import Login from '@/views/login';
// import Test1 from '@/views/testPages/Test1';
// import Test2 from '@/views/testPages/Test2';
// import Test3 from '@/views/testPages/Test3';
// import Test4 from '@/views/testPages/Test4';
// import Test5 from '@/views/testPages/Test5';

// TODO: 因为使用 Switch 所以配置路由的顺序需要注意
const routes = [
    {
        path: '/login',
        component: () => import('@/views/login'),
        exact: true,
        meta: {
            title: '登录页',
        },
    },
    {
        path: '/',
        component: Home,
        // 自定义参数 noPage 说明不是一个页面
        noPage: true,
        childRoutes: [
            {path: '/', exact: true, component: () => import('@/views/testPages/Test1')},
            {path: '/test1', exact: true, redirect: '/', noPage: true},
            {path: '/test2', exact: true, component: () => import('@/views/testPages/Test2')},
            {path: '/test3', exact: true, component: () => import('@/views/testPages/Test3')},
            {path: '/test4', exact: true, component: () => import('@/views/testPages/Test4')},
            {path: '/test5/:id', exact: true, component: () => import('@/views/testPages/Test5')},
            {path: '/test6', exact: true, component: () => import('@/views/testPages/Test6/Test6')},
            {path: '*', exact: true, component: Page404},
        ],
    },
];

export default routes;
