# @vusion/routes-loader

## 约定式路由

嵌套为主的路由结构。

### 规则

- 目录结构决定路由层级
- 如果模块或枝页面下面没有`index.vue`，会用`LWrapper`组件填充
- 以下目录为关键词目录，内部不应该有与路由相关的视图，文件和子文件路径都不会添加为路由：`assets`、`components`, `directives`, `filters`, `mixins`, `utils`, `styles`, `service`, `module`
- 以下目录为占位符目录，只是为了方便归类视图文件，占位目录名不体现在路径上：`views`、`layout`
- `_id`会替换为变量类型`:id`
- `_id_`会替换为可选变量类型`:id?`
- `any+`会替换为通配类型`any*`
- `=outside`会将该文件及子文件的路径做为固定路由，拉出嵌套结构

可以参考 [normalize](https://github.com/vusion/packages/blob/master/src/routes-loader/lib/utils.js#L35) 函数。

### 示例

```
├─ account/                 #
│   ├─ module/              # 忽略关键字目录
│   ├─ components/          # 忽略关键字目录
│   │   ├─ s-detail.vue     #
│   │   │   │   └─ ...
│   ├─ utils/               # 忽略关键字目录
│   ├─ views/
│   │   ├─ list.vue         #
│   │   ├─ settings/        #
│   │   │   ├─ _id_.vue     #
│   │   ├─ micro/           #
│   │   │   ├─ cloud++.vue  #
│   │   ├─ detail/          #
│   │   │   ├─ index.vue    #
│   │   │   ├─ info.vue     #
│   │   │   ├─ monitor.vue  #
│   │   │   ├─ =deep/       #
│   │   │   │   ├─ list.vue #
│   │   └─ ...
```

将会生成

``` js
export default {
    path: 'account',
    component: LWrapper,
    children: [
        { path: '', redirect: 'list' },
        { path: 'list', component: () => import(/* webpackChunkName: 'account' */ './views/list.vue') },
        { path: 'settings', component: LWrapper, children: [
            { path: ':id?', component: () => import(/* webpackChunkName: 'account' */ './views/detail/_id_.vue') },
        ] },
        { path: 'micro', component: LWrapper, children: [
            { path: '', redirect: 'cloud**' },
            { path: 'cloud**', component: () => import(/* webpackChunkName: 'account' */ './views/micro/cloud++.vue') },
        ] },
        { path: 'detail', component: () => import(/* webpackChunkName: 'account' */ './views/index.vue'), children: [
            { path: '', redirect: 'info' },
            { path: 'info', component: () => import(/* webpackChunkName: 'account' */ './views/detail/info.vue') },
            { path: 'monitor', component: () => import(/* webpackChunkName: 'account' */ './views/detail/monitor.vue') },
        ] },
        { path: 'detail/deep/list', component: () => import(/* webpackChunkName: 'account' */ './views/detail/deep/list.vue') },
    ],
};
```
