import Home from '@/views/home';
import Page404 from '@/views/Page404';
import Login from '@/views/login';
import Test1 from '@/views/testPages/Test1';
import Test2 from '@/views/testPages/Test2';
import Test3 from '@/views/testPages/Test3';
import Test4 from '@/views/testPages/Test4';
import Test5 from '@/views/testPages/Test5';

// TODO: 因为使用 Switch 所以配置路由的顺序需要注意
const routes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/',
        component: Home,
        childRoutes: [
            {path: '/', exact: true, component: Test1},
            // TODO: 重定向怪怪的，可能写的有问题
            // {path: '/test1', exact: true, redirect: '/'},
            {path: '/test2', exact: true, component: Test2},
            {path: '/test3', exact: true, component: Test3},
            {path: '/test4', exact: true, component: Test4},
            {path: '/test5/:id', exact: true, component: () => import('@/views/testPages/Test5')},
            {path: '*', exact: true, component: Page404},
        ]
    },
]

export default routes;
