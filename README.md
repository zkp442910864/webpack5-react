# webpack5-react

```
react-scoped-css 方式使用css，只对文件后缀 .scoped.(sa|sc|le|c)ss$ 起作用
.bbb2 /deep/ .bbbbb {} // 这种方式来影响组件样式
```

```
\src\router\index.ts 模拟了 vue的路由守卫
useRouter getRouter 获取路由参数，分 hooks和 非hooks调用

\src\router\routes.ts 路由配置
```

```
\src\store\index.ts
    通过 useStoreModule 获取到对应的 值 和 dispatch(这个返回一个promise)

\src\store\modules\test.ts 配置redux，在目录下新增新的模块
    异步的请求的可以用 asyncAction 包裹着，使用方式看下注释
```


