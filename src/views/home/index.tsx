import React, {FC, useEffect} from 'react';
// import {useHistory} from 'react-router';
import {useStoreModule} from '@/store';
import './index.less';

const Home: FC = (props) => {
    const [test, dispatch] = useStoreModule((state) => state);

    useEffect(() => {
        // console.log(test)
        // dispatch('asdf', 2)
        // console.log(dispatch('assss', 1))
        dispatch('test/assss', 1).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="bbb">
            包装层
            <pre>
                {JSON.stringify(test, null, 4)}
            </pre>
            {/* 包装层 {JSON.stringify(store.getState())} */}
            <div className="flex-box">~~~~~~~~</div>
            {props.children}
        </div>
    );
};

export default Home;

