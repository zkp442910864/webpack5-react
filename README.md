# webpack5-react


### 样式文件
```
react-scoped-css 方式使用css，只对文件后缀 .scoped.(sa|sc|le|c)ss$ 起作用
.bbb2 /deep/ .bbbbb {} // 这种方式来影响组件样式
```

### 路由
###### 路由守卫, 模拟了 vue的路由守卫
> \src\router\index.ts 通过 setAfterEach， setBeforeEach 来控制路由
> 路由守卫的逻辑，主要是通过 RouteIntercept 这个组件，进行渲染拦截，当路由匹配到对应组件时候，会先经过这一步
> 1. 通过 RouteIntercept 这个组件，进行渲染拦截，锁住
> 2. 组件运行的时候，会先执行 setBeforeEach，然后通过 next() 进行解锁
> 3. 解锁后渲染 LoadPage，这个组件会去下载资源文件，并进行渲染
> 4. 渲染完后执行 setAfterEach

###### 路由配置 \src\router\routes.ts
###### 使用方式
```
    import {useRouter, getRouter} from '@/router';
    // useRouter hooks中使用
    // getRouter 任务地方都可以使用

    // const router = useRouter();
    // router.history.push('/login');
```


### 仓库
###### 模块添加
> 在目录下新增xxx.ts模块 \src\store\modules\xxx.ts
> 一个默认参数，一个键值对象，然后用 createReducersModule 包裹，进行导出
> 仓库中的异步函数，需要用 asyncAction 包裹，这里面进行了请求状态变更，会生成 {load, fail, success} 这种对象
```
    import {createReducersModule, TMap, asyncAction} from '../config';

    // 默认值
    const defaultData = {
        abc: 123,
        abc2: 123,
        abc3: 123,
        abc4: 123,
        ddd: {}
    };

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
```

###### 使用方式
```
    import store, {useStoreModule, dispatch} from '@/store';
    // store 任何地方都能使用
    // useStoreModule hooks中使用
    // dispatch 可以直接使用的，经过二次封装
    // 调用返回一个Promise ：dispatch: (type, data) => Promise<any>;

    // console.log(store.getState()); // 直接打印出仓库中所有数据
    // const [test, dispatch, rawDispatch] = useStoreModule((state) => state.test.ddd);
    // 数据1：指定从仓库中取出的值。 数据2：经过二次封装的任务触发器，同上。数据3：原生的dispatch
```


