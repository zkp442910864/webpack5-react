import React, {useState, FC, useRef, useContext, useEffect} from 'react';
import {match} from 'react-router';
import {Location} from 'history';
import {useRouter, DataTakeAlong} from '../config';

type TNext = (path?: string, type?: 'push' | 'replace') => void;
type TTarget = {
    location: Location<unknown>;
    params: IOBJ;
    match: match<IOBJ>;
    meta: IOBJ;
    query: IOBJ;
};

export type TBeforeEach = (next: TNext, target: TTarget) => void;
export type TAfterEach = (target: TTarget) => void;
export interface IRouteInterceptProps {
    /**
     * 是否页面，路由配置里设置
     */
    noPage?: boolean;
    beforeEach: TBeforeEach;
    afterEach: TAfterEach;
    meta?: IOBJ;
    /**
     * 路由信息 主要用来监听是否变化，然后执行
     */
    routerInfo: IOBJ;
}

const RouteIntercept: FC<IRouteInterceptProps> = (props) => {
    const {children, beforeEach, afterEach, routerInfo, noPage, meta = {}} = props;
    const [show, setShow] = useState(false);
    // 初始化的锁
    const [lock, setLock] = useState(false);
    // const control = useRef<null | number>(null);
    const {history, location, params, match, query} = useRouter(meta);
    const parent: any = useContext(DataTakeAlong);

    const next: TNext = (path, type = 'push') => {
        // console.log('下一步');
        if (path) {
            // 直接执行会报错
            setTimeout(() => {
                history[type](path);
            }, 0);
        } else {
            setShow(true);
        }
    };

    const setAfterFun = () => {
        parent.afterEach = () => {
            afterEach({location, params, match, meta, query});
        };
    };


    // if (!lock) {
    //     if (noPage) {
    //         next();
    //     } else {
    //         // console.log('before');
    //         setAfterFun();
    //         beforeEach(next, {location, params, match, meta});
    //         setLock(true);
    //     }
    // }


    // 路由信息变更的时候 触发，而且不是第一次的时候
    useEffect(() => {
        if (noPage) {
            next();
        } else if (lock && !noPage) {
            // console.log(1);
            setAfterFun();
            beforeEach(next, {location, params, match, meta, query});
        } else {
            setLock(true);
        }
    }, [lock, routerInfo]);

    return (
        <>
            {show ? children : ''}
        </>
    );
};

export default RouteIntercept;
