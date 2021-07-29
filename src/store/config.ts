
// 触发函数传入的值
export interface IMapFunData {
    state: IOBJ;
    data: any;
    callback: (res?: any) => void;
    allState: IOBJ;
    dispatch: any;
    type: string;
    /**
     * 异步接口产生的状态
     */
    asyncStatus?: 'load' | 'success' | 'fail';
};
export type TMap = {
    /**
     * 传入的 callback 不执行的话，会导致 Promise 一直处理在 pending状态
     *
     * 普通处理函数， callback 执不执行，影响不大（需要手动执行）
     *
     * 异步函数 createAsyncAction，这里面会自动执行
     */
    [key: string]: (obj: IMapFunData & {dispatch: (o: {type: string, payload: any}) => void}) => void
};

// actions 接受到的值
export interface TActionData {
    type: string;
    dispatch: any;
    callback: (res?: any) => void;
    payload?: any;
    allState: IOBJ;
    asyncStatus?: 'load' | 'success' | 'fail';
}


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
}

/**
 * 二次封装 dispatch
 * @param dispatch 执行函数
 * @param allState 所有state
 * @param type 匹配类型
 * @param payload 参数
 * @returns Promise<{dispatchData, res}>
 */
export const dispatchPackage = (dispatch: any, allState: IOBJ, type: string, payload?: any) => {
    return new Promise((rel, rej) => {
        dispatch({
            type,
            payload,
            allState,
            dispatch,
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
}

/**
 * 异步函数
 * 同一个函数里，处理不同的逻辑
 * @param obj IMapFunData 参数
 * @param valKey 存放数据的key 该 key对应的值是一个对象（如果没有这个值会默认为 {}）
 * @param requestFun 异步函数
 * @returns (obj: IMapFunData) => void
 */
export const asyncAction = (obj: IMapFunData, valKey: string, requestFun: (params: IOBJ) => Promise<any>) => {
    const {state, callback, allState, dispatch, asyncStatus, type, data: params} = obj;
    const value: IOBJ = state[valKey] = (state[valKey] instanceof Object) ? state[valKey] : {};
    const change = (status: string) => {
        // console.log({
        //     type,
        //     payload: params,
        //     asyncStatus: status,
        //     allState,
        //     callback
        // })
        dispatch({
            type,
            payload: params,
            asyncStatus: status,
            allState,
            callback
        } as TActionData);
    }


    if (asyncStatus === 'success' || asyncStatus === 'fail') {
        callback(value);
    } else if (asyncStatus !== 'load') {
        value.load = true;
        value.fail = undefined;

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

}

/**
 * 生成 store模块
 * @param namespace 模块名称
 * @param defaultData 默认值
 * @param mapFn 处理函数
 * @returns 模块
 */
export const createReducersModule = (namespace: string, defaultData: IOBJ, mapFn: TMap) => {
    return {
        // 模块名称
        namespace,
        // 处理匹配
        module: (state: IOBJ = defaultData, action: TActionData) => {

            try {
                if (action.type && !~action.type.indexOf('@@redux')) {
                    // debugger
                    action.callback = typeof action.callback === 'function' ? action.callback : (() => {});
                    mapFn[action.type] && mapFn[action.type]({
                        state,
                        type: action.type,
                        dispatch: action.dispatch,
                        data: action.payload,
                        callback: action.callback,
                        allState: action.allState,
                        asyncStatus: action.asyncStatus,
                    });
                }
            } catch (error) {
                console.error(error);
            }
            return Object.assign({}, state)
        },
    }
}

