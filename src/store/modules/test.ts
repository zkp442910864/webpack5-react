import {createReducersModule, TMap, asyncAction} from '../config';

// 默认值
const defaultData = {
    abc: 123,
    abc2: 123,
    abc3: 123,
    abc4: 123,
    ddd: {}
};

// {[key in keyof typeof defaultData]: any}
// 处理函数
const mapFn: TMap = {
    'test/asdf': ({getLastState, data, callback, allState, dispatch, asyncStatus, type}) => {
        const state = getLastState();
        state.abc = data;
        // debugger;
        callback();
    },
    'test/assss': (obj) => asyncAction(obj, 'ddd', (params) => {
        const {data, callback, getAllState, dispatch, asyncStatus, type} = obj;

        return new Promise((rel, rej) => {
            setTimeout(() => {
                // dispatch('test2/asdf2', 'success');
                // console.log(getAllState());
                rel('success' + data);
                // rej('fail');
            }, 1000);
        });
    })
};

export default createReducersModule('test', defaultData, mapFn);
