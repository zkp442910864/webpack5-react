
// 触发函数传入的值
export interface IMapFunData {
    /**
     * 当前模块所对应的数据
     */
    // state: IOBJ;
    /**
     * 新数据
     */
    data: any;
    /**
     * 触发任务后，进行回调，用来获取操作后的结果
     */
    callback: (res?: any) => void;
    /**
     * 所有模块的数据
     *
     * TODO: 在异步状态的函数中，这个数据会存在，不是最新的情况
     */
    allState: IOBJ;
    /**
     * 获取所有模块的数据
     *
     * TODO: 因为异步函数中，allState 存在不是最新的情况，所以可以在异步回调中使用该函数，获取最新的 allState
     */
    getAllState: () => IOBJ;
    /**
     * 触发任务
     */
    dispatch: (type: string, data: any) => Promise<any>;
    /**
     * 原触发任务
     */
    rawDispatch: (data: IMapFunData) => void;
    /**
     * 触发任务的类型
     */
    type: string;
    /**
     * 异步接口产生的状态
     */
    asyncStatus?: 'load' | 'success' | 'fail';
    /**
     * 获取最新的 state
     */
    getLastState: () => IOBJ;
}

export type TMap = {
    /**
     * 传入的 callback 不执行的话，会导致 Promise 一直处理在 pending状态
     *
     * 普通处理函数， callback 执不执行，影响不大（需要手动执行）
     *
     * 异步函数 createAsyncAction，这里面会自动执行
     */
    [key: string]: (obj: IMapFunData) => void
};

/**
 * 动态获取模块
 * @param arr {module: any, namespace: string}[]
 * @returns {[namespace]: module}
 */
export const getReducersModule = () => {
    type TModule = {module: any, namespace: string};

    const files = (require as any).context('./modules', true, /.ts$/);
    // const rModules: TModule[] = [];
    const obj: IOBJ = {};

    // console.dir(files);
    // console.log(files.keys());
    files.keys().forEach((item: TModule) => {
        const child = files(item).default;
        // console.log(child);
        // rModules.push(child);
        obj[child.namespace] = child.module;
    });

    // rModules.forEach((item) => {
    //     obj[item.namespace] = item.module;
    // });

    return obj;
};

/**
 * 二次封装 dispatch
 * @param dispatch 执行函数
 * @param rawDispatch 原执行函数
 * @param allState 所有state
 * @param getAllState 获取所有state
 * @param type 匹配类型
 * @param payload 参数
 * @returns Promise<{dispatchData, res}>
 */
export const dispatchPackage = (
    dispatch: any,
    rawDispatch: (data: Omit<IMapFunData, 'getLastState'>) => void,
    allState: IOBJ,
    getAllState: () => IOBJ,
    type: string,
    payload?: any
) => {
    return new Promise((rel, rej) => {
        rawDispatch({
            type,
            data: payload,
            allState,
            getAllState,
            dispatch,
            rawDispatch,
            callback (res: any) {
                // const dispatchData = {
                //     type,
                //     payload,
                // }

                if (res && res.fail) {
                    rej(res);
                } else {
                    rel(res);
                }
            }
        });
    });
};

/**
 * 异步函数
 * 同一个函数里，处理不同的逻辑
 * @param obj IMapFunData 参数
 * @param valKey 存放数据的key 该 key对应的值是一个对象（如果没有这个值会默认为 {}）
 * @param requestFun 异步函数
 * @returns (obj: IMapFunData) => void
 */
export const asyncAction = (obj: IMapFunData, valKey: string, requestFun: (params: IOBJ) => Promise<any>) => {
    const {callback, allState, getAllState, dispatch, rawDispatch, asyncStatus, type, data: params, getLastState} = obj;
    const state = getLastState();
    const value: IOBJ = state[valKey] = typeof state[valKey] === 'object' ? state[valKey] : {};
    // debugger;
    // 异步状态变化
    const change = (status: IMapFunData['asyncStatus']) => {
        const lastState = getLastState();
        lastState[valKey] = {...value};

        // 原生的 dispatch
        rawDispatch({
            type,
            data: params,
            allState,
            getAllState,
            dispatch,
            rawDispatch,
            callback,
            asyncStatus: status,
            getLastState,
        });
    };


    if (asyncStatus === 'success' || asyncStatus === 'fail') {
        callback(value);
    } else if (asyncStatus !== 'load') {
        value.load = true;
        value.fail = undefined;
        value.success = undefined;

        // TODO: 注意以下的操作，都是延时的，所以使用的state 都不是最新的

        // 这里不能在同一个任务里调用 dispatch，所以放到下一个任务了
        // setTimeout(() => {
        //     change('load');
        // }, 0);
        Promise.resolve().then(() => {
            change('load');
        });

        requestFun(params).then((res) => {
            value.load = false;
            value.fail = undefined;
            value.success = res;
            // console.log(dispatch)
            change('success');
        }).catch((err) => {
            value.load = false;
            value.fail = err;
            value.success = undefined;
            change('fail');
        });
    }

};

/**
 * 生成 store模块
 * @param namespace 模块名称
 * @param defaultData 默认值
 * @param mapFn 处理函数
 * @returns 模块
 */
export const createReducersModule = (namespace: string, defaultData: IOBJ, mapFn: TMap) => {

    // 为了拿到最新的 state
    let lastState: IOBJ = defaultData;
    const getLastState = () => lastState;

    return {
        // 模块名称
        namespace,
        // 处理匹配
        module: (state: IOBJ = defaultData, action: IMapFunData) => {
            // 保证异步中 取到的state 都是同一个
            lastState = Object.assign({}, state);
            // debugger;

            try {
                if (action.type && !~action.type.indexOf('@@redux')) {
                    // TODO: dispatch: type值定义为 模块名称/执行任务
                    // 符合的 模块才执行
                    if (!~action.type.indexOf(`${namespace}/`)) {
                        return lastState;
                    }

                    // debugger
                    if (mapFn[action.type]) {
                        // TODO: 考虑加个防抖，直接默认执行，如果其它函数有执行，直接覆盖掉
                        const cbFn = action.callback;
                        action.callback = (...arg) => {
                            if (typeof cbFn === 'function') {
                                cbFn(...arg);
                            }
                        };
                        mapFn[action.type]({
                            // state: lastState,
                            type: action.type,
                            dispatch: action.dispatch,
                            rawDispatch: action.rawDispatch,
                            data: action.data,
                            callback: action.callback,
                            allState: action.allState,
                            getAllState: action.getAllState,
                            asyncStatus: action.asyncStatus,
                            getLastState,
                        });
                        // action.callback();
                    }
                }
            } catch (error) {
                console.error(error);
            }

            // console.log(lastState);
            return lastState;
        },
    };
};

