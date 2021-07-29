import React, {FC} from 'react';
import {useRouter} from '@/router';

const Test5: FC = (props) => {
    const router = useRouter();

    const link = () => {
        router.history.push('/login');
    };

    return (
        <div onClick={link}>Test-5</div>
    );
};

export default Test5;

