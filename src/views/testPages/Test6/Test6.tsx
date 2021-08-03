import React, {FC} from 'react';
import {useRouter} from '@/router';
import {testApi1} from '@/apis';
import './index.scoped.less';

const Test6: FC = (props) => {
    const router = useRouter();

    const link = () => {
        // router.history.push('/login');
        console.log(testApi1);
    };


    return (
        <div className="bbbbb" onClick={link}>
            Test-666
            <img src={require('@/assets/img/bd.jpg')}/>
        </div>
    );
};

export default Test6;

