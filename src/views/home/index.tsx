import React, {FC, useEffect} from 'react';
// import {useHistory} from 'react-router';
import {useStoreModule} from '@/store';

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
        <div>
            包装层
            <pre>
                {JSON.stringify(test, null, 4)}
            </pre>
            {/* 包装层 {JSON.stringify(store.getState())} */}
            <div>~~~~~~~~</div>
            {props.children}
        </div>
    );
};

export default Home;

