/**
 * 渲染路由页面
 */
// https://www.cnblogs.com/cckui/p/11490372.html
import React, {useContext} from 'react';
import {BrowserRouter, HashRouter, Route, Redirect, Switch} from 'react-router-dom';
import LoadPage from './LoadPage';
import RouteIntercept, {TBeforeEach, TAfterEach} from './RouteIntercept';
import routes from '../routes';
import {DataTakeAlong} from '../config';

let beforeEach: TBeforeEach = (next) => next();
let afterEach: TAfterEach = () => {};

export const setBeforeEach = (beFun: TBeforeEach) => {
    beforeEach = beFun;
};

export const setAfterEach = (aeFun: TAfterEach) => {
    afterEach = aeFun;
};


const RenderPage = () => {

    const renderRoutes = (list: any[]) => {
        if (!list.length) return (<></>);

        return (
            // TODO: Switch 只匹配一次，一旦命中，就不会继续匹配
            <Switch>
                {
                    list.map((item, index) => {
                        const {childRoutes = [], component: Com, redirect, path, noPage, meta, ...other} = item;
                        // 重定向数据
                        const redirectArr = childRoutes.filter((ii: any) => !!ii.redirect);
                        // 正常路由数据
                        const normalArr = childRoutes.filter((ii: any) => !ii.redirect);

                        const NewRoute: any = redirect ? Redirect : Route;

                        return (
                            <NewRoute
                                key={index}
                                // ~重定向使用的
                                form={path}
                                to={redirect}
                                // 重定向使用的~
                                path={path}
                                {...other}
                                render={({children, ...props}: any) => {
                                    // TODO: 大概思路： 弄个中间组件，增加个 beforeEach 和 afterEact 模仿 vue-router的方式
                                    // 加载时候执行 beforeEach，加载完成后执行 afterEact
                                    // beforeEach 函数传入 next 来加载页面，重定向页面，阻止页面渲染，执行该函数才会渲染出页面(相当于这个函数是个开关) 这些功能
                                    return (
                                        <DataTakeAlong.Provider value={{}}>
                                            <RouteIntercept beforeEach={beforeEach} afterEach={afterEach} routerInfo={props} noPage={noPage} meta={meta}>
                                                <LoadPage component={Com} routerInfo={props} noPage={noPage} {...props}>
                                                    {renderRoutes([...redirectArr, ...normalArr])}
                                                </LoadPage>
                                            </RouteIntercept>
                                        </DataTakeAlong.Provider>
                                    );
                                    // return (
                                    //     <Com {...props}>
                                    //         {renderRoutes([...redirectArr, ...normalArr])}
                                    //     </Com>
                                    // )
                                }}
                            />
                        );
                    })
                }
            </Switch>
        );
    };


    return (
        <HashRouter>
            {renderRoutes(routes)}
        </HashRouter>
    );
};

export default RenderPage;
