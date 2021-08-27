import React, {FC} from 'react';
import {useRouter} from '@/router';
import {testApi1} from '@/apis';

const Test5: FC = (props) => {
    const router = useRouter();

    const link = () => {
        // router.history.push('/login');
        console.log(testApi1);
    };


    return (
        <div onClick={link}>
            Test-5555
            <img src={require('@/assets/img/bd.jpg')}/>
            <img src={require('@/assets/img/bd-no-bg.png')}/>
            <img src={require('@/assets/img/wish.png')}/>
        </div>
    );
};

export default Test5;

