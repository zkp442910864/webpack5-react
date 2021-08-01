import React from 'react';
import {useHistory, useLocation, useParams, useRouteMatch} from 'react-router';

// 组件间 函数使用
export const DataTakeAlong  = React.createContext({});

// 获取路由参数
export const useRouter = () => {
    return {
        history: useHistory(),
        location: useLocation(),
        params: useParams(),
        match: useRouteMatch(),
    };
};
