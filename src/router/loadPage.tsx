/**
 * 异步加载页面
 */

import React, {FC, useState, useEffect, useRef} from 'react';

type TSyncComponent = () => Promise<{default: (props: any) => JSX.Element}>;
interface ILoadPageProps {
    component: TSyncComponent | ((props: any) => JSX.Element);
}

const LoadPage: FC<ILoadPageProps> = (props) => {
    const {component, children, ...other} = props;
    const [load, setLoad] = useState(false);
    const [render, setRender] = useState<JSX.Element | null>(null);

    useEffect(() => {
        /**
         * TODO: 注意，这里的异步组件是通过判断函数名称来进行判断
         */
        if (component.name === 'component') {
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
            const Com = component as unknown as (props: any) => JSX.Element;
            setRender(<Com {...other} children={children} />);
        }
    }, []);

    // console.log(123)

    return (
        <>
            {load ? '加载中' : render}
        </>
    );
};

export default LoadPage;
