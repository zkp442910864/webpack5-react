import React, {FC, useEffect, useState} from 'react';
// import AsyncSelect from '@zzzz-/react-antd-extends/es/components/Test';
// import AsyncSelect from '@zzzz-/react-antd-extends/es/components/MyModal';
// import AsyncSelect from '@zzzz-/react-antd-extends/es/components/MyQueryForm/modules/AsyncSelect';
import {Exhibit, AsyncSelect} from '@zzzz-/react-antd-extends';
// import {AsyncSelect} from '@zzzz-/react-antd-extends/dist/index.js';
// import {Select} from 'antd';
import 'antd/dist/antd.css';

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
            // console.log(a);
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
            {/* <Select /> */}
            <AsyncSelect />
            <Exhibit rIf={true}>
                123
            </Exhibit>
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

