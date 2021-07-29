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
    asdf: ({state, data, callback, allState, dispatch, asyncStatus, type}) => {
        state.abc = data;
        callback();
    },
    assss: (obj) => asyncAction(obj, 'ddd', (params) => {
        const {state, data, callback, allState, dispatch, asyncStatus, type} = obj;
        // console.log(params);

        return new Promise((rel, rej) => {
            setTimeout(() => {
                dispatch({
                    type: 'asdf',
                    payload: 'success',
                });
                rel('success');
                // rej('fail');
            }, 1000);
        })
    })
}

export default createReducersModule('test', defaultData, mapFn);
