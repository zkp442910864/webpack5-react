import React from 'react';
import {useHistory, useLocation, useParams, useRouteMatch, match} from 'react-router';
import {Location, History} from 'history';
import qs from 'qs';

// 路由数据
export type TRouterData = {
    history: History<unknown>;
    location: Location<unknown>;
    params: IOBJ;
    match: match<IOBJ>;
    meta: IOBJ;
};

let router: TRouterData | null = null;

// 组件间 函数使用
export const DataTakeAlong  = React.createContext({});

// 获取路由参数
export const useRouter = (meta: IOBJ = {}) => {
    const location = useLocation();
    const obj = {
        meta,
        location,
        history: useHistory(),
        params: useParams(),
        match: useRouteMatch(),
        query: qs.parse(location.search.substr(1))
    };

    // 在路由拦截里每个页面都会调用一次，直接进行覆盖
    router = obj;
    return obj;
};

/**
 * 获取路由参数
 *
 * @returns
 */
export const getRouter = () => router as TRouterData;
