import React, {FC, useEffect} from 'react';
// import {useHistory} from 'react-router';
import Text from '@/components/Test';
import {useStoreModule} from '@/store';
import './index.scoped.less';

const Home: FC = (props) => {
    const [test, dispatch] = useStoreModule((state) => state);

    useEffect(() => {
        // dispatch('asdf', 2)
        // console.log(dispatch('assss', 1))
        dispatch('test/assss', 1).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="bbb bbb2">
            包装层
            <Text />
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

