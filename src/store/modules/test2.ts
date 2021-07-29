import {createReducersModule, TMap} from '../config';

// 默认值
const defaultData = {
    abc2: 123111,
    abc22: 123,
    abc32: 123,
    abc42: 123,
};

// {[key in keyof typeof defaultData]: any}
// 处理函数
const mapFn: TMap = {
    asdf2: ({state, data, callback, allState}) => {
        console.log(allState)
        state.abc = data;
        callback();
    }
}

export default createReducersModule('test2', defaultData, mapFn);
