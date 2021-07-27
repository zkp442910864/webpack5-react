import React, {FC, useEffect} from 'react';
// import {useHistory} from 'react-router';
// import {useRouterData} from '@/router';

const Main: FC = (props) => {
    // const router = useRouterData();

    // console.log(props);
    useEffect(() => {
        // console.log(router);
    }, [])

    return (
        <div>
            包装层
            <div >~~~~~~~~</div>
            {props.children}
        </div>
    )
};

export default Main;

