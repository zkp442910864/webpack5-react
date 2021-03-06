// import createStore from 'react-redux';
import {createStore, Store, combineReducers, Dispatch} from 'redux';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {getReducersModule, dispatchPackage} from './config';
// import test from './modules/test';
// import test2 from './modules/test2';

// TODO: 要注意不要在 dispatch逻辑里调用 dispatch（可以放到下一个宏微任务）
// TODO: dispatch: type值定义为 模块名称/执行任务
const reducer = combineReducers(getReducersModule());
const store: Store<any, any> = createStore(reducer);

// 任务触发器
export const dispatch = (type: string, payload?: any) => dispatchPackage(dispatch, store.dispatch, store.getState(), store.getState, type, payload);

// 获取 值和 触发函数
export const useStoreModule = (fn: (state: any) => any) => {
    // const curStore = useStore();
    const val = useSelector(fn);
    // const dispatch = useDispatch();

    // console.log(curStore.getState());
    // 二次封装
    // const newDispatch = (type: string, payload?: any) => dispatchPackage(newDispatch, dispatch, curStore.getState(), store.getState, type, payload);

    return [val, dispatch, store.dispatch] as [any, (type: string, payload?: any) => Promise<any>, Dispatch<any>];
};

export default store;
