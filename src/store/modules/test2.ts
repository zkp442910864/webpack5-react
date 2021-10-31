import {createReducersModule, TMap} from '../config';

// 默认值
const defaultData = {
    abc2: 123111,
};

// {[key in keyof typeof defaultData]: any}
// 处理函数
const mapFn: TMap = {
    'test2/asdf2': ({getLastState, data, callback, allState}) => {
        // console.log(allState);
        const state = getLastState();
        state.abc = data;
        callback();
    }
};

export default createReducersModule('test2', defaultData, mapFn);
