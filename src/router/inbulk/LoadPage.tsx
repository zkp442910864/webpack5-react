/* eslint-disable react/no-children-prop */

/**
 * 异步加载页面
 */

import React, {FC, useState, useEffect, useContext} from 'react';
import {DataTakeAlong} from '../config';

type TSyncComponent = () => Promise<{default: (props: any) => JSX.Element}>;
interface ILoadPageProps {
    component: TSyncComponent | ((props: any) => JSX.Element);
    children: JSX.Element;
    // name: string;
    /**
     * 路由信息 主要用来监听是否变化，然后执行
     */
    routerInfo: IOBJ;
    /**
     * 是否页面，路由配置里设置
     */
    noPage?: boolean;
}

const LoadPage: FC<ILoadPageProps> = (props) => {
    const {component, children, routerInfo, noPage, ...other} = props;
    const [load, setLoad] = useState(true);
    const [render, setRender] = useState<JSX.Element | null>(null);
    const parent: any = useContext(DataTakeAlong);

    // 加载组件
    const loadComponent = () => {
        setLoad(true);
        const Com = component as unknown as (props: any) => JSX.Element;
        setRender(<Com {...other} children={children} />);
        setLoad(false);
    };

    // 加载异步组件
    const loadAsyncComponent = async () => {
        setLoad(true);

        try {
            const res = await (component as TSyncComponent)();
            const Com = res.default;
            setRender(<Com {...other} children={children} />);
            setLoad(false);
        } catch (error) {
            console.warn('异步组件加载失败, 1.可能是组件被当成异步组件加载了. 2.建议异步组件函数不要带参数,同步组件有个默认参数props');
            console.warn(error);
            loadComponent();
        }

    };

    useEffect(() => {
        /**
         * TODO: 注意，这里的异步组件是通过判断函数参数来进行判断
         *
         * 这个逻辑不靠谱，做个报错兼容
         */
        if (typeof component === 'function' && !component.length) {
            loadAsyncComponent();
        } else {
            loadComponent();
        }
    }, []);

    useEffect(() => {
        if (!load && !noPage) {
            // TODO: 定时器是为了 等待上层组件先加载完
            // 直接改变路径参数时候，必要的
            setTimeout(() => {
                // console.log(2);
                parent.afterEach();
            }, 0);
        }
    }, [load, routerInfo]);

    // console.log(123)

    return (
        <>
            {load ? '加载中' : render}
        </>
    );
};

export default LoadPage;
