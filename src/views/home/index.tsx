import React, {FC, useEffect, useState} from 'react';
// import {useHistory} from 'react-router';
import Text from '@/components/demo/Test';
import {useStoreModule} from '@/store';
import './index.scoped.less';

const Home: FC = (props) => {
    const [test, dispatch] = useStoreModule((state) => state.test.ddd);
    const [a] = useState();
    // window.ad = async () => {
    //     await dispatch('test/assss', 2);
    // };

    useEffect(() => {
        (async () => {
            // dispatch('test/asdf', 2);
            // dispatch('test/asdf', 2);
            // dispatch('test/asdf', 2);
            // console.log(123);
            const a = await dispatch('test/assss', 1);
            console.log(a);
            // await dispatch('test/assss', 2);
            // await dispatch('test/assss', 3);
        })();
        // console.log(dispatch('assss', 1))
        // dispatch('test/assss', 1).then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log(err);
        // });
    }, []);

    useEffect(() => {
        // console.log(test, 1);
        console.log(test);
    }, [test]);

    return (
        <div className="bbb bbb2">
            包装层
            <Text />
            <pre>
                {JSON.stringify(test, null, 4)}
                {/* {JSON.stringify(test.test.ddd)} */}
            </pre>
            {/* {test?.test?.ddd} */}
            {/* 包装层 {JSON.stringify(store.getState())} */}
            <div className="flex-box">~~~~~~~~</div>
            {props.children}
        </div>
    );
};

export default Home;

