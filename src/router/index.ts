

import {useHistory, useLocation, useParams, useRouteMatch} from 'react-router';
export {default as RouterView} from './renderPage';

// 获取路由参数
export const useRouter = () => {
    return {
        history: useHistory(),
        location: useLocation(),
        params: useParams(),
        match: useRouteMatch(),
    };
};


