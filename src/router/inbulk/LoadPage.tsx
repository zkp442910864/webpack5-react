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


    useEffect(() => {
        /**
         * TODO: 注意，这里的异步组件是通过判断函数名称来进行判断
         */
        if (typeof component === 'string' || component.name === 'component') {
            (async () => {
                setLoad(true);
                // await (new Promise((rel) => {
                //     setTimeout(() => {
                //         rel();
                //     }, 5000);
                // }));

                try {
                    const res = await (component as TSyncComponent)();
                    const Com = res.default;
                    setRender(<Com {...other} children={children} />);
                } catch (error) {
                    console.error('异步组件加载失败', error);
                    setLoad(false);
                }
                setLoad(false);
            })();

        } else {
            setLoad(true);
            const Com = component as unknown as (props: any) => JSX.Element;
            setRender(<Com {...other} children={children} />);
            setLoad(false);
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
