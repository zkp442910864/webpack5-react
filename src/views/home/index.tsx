import React, {FC, useEffect} from 'react';
// import {useHistory} from 'react-router';
// import {useRouterData} from '@/router';
import {useStoreModule} from '@/store';

const Main: FC = (props, context) => {
    // const router = useRouterData();
    const [test, dispatch] = useStoreModule((state) => state.test);

    useEffect(() => {
        // console.log(test)
        // dispatch('asdf', 2)
        // console.log(dispatch('assss', 1))
        dispatch('assss', 1).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <div>
            包装层
            <pre>
                {JSON.stringify(test, null, 4)}
            </pre>
            {/* 包装层 {JSON.stringify(store.getState())} */}
            <div >~~~~~~~~</div>
            {props.children}
        </div>
    )
};

export default Main;

