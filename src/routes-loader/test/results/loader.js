import * as lodash from 'lodash';

export default { path: 'demo', component: require('cloud-ui.vusion/src/layouts/l-wrapper.vue').default, children: [
    { path: '', redirect: 'detail' },
    /* for routes.map.js: detail */
    { path: 'detail', component: () => import(/* webpackChunkName: "demo" */ './views/detail/index.vue'), name: 'demo.detail', meta: {title:'详情',crumb:'详情'}, children: [
        { path: '', redirect: ':monitor?' },
        /* for routes.map.js: detail/:monitor? */
        { path: ':monitor?', component: () => import(/* webpackChunkName: "demo" */ './views/detail/_monitor_.vue') },
        /* for routes.map.js: detail/info */
        { path: 'info', component: () => import(/* webpackChunkName: "demo" */ './views/detail/info.vue'), meta: {crumb:'详细信息'} },
        /* for routes.map.js: detail/monitor */
        { path: 'monitor', meta: {crumb:'监控'} },
    ] },
    /* for routes.map.js: list */
    { path: 'list', component: require('cloud-ui.vusion/src/layouts/l-wrapper.vue').default, children: [
        { path: '', redirect: 'basic' },
        /* for routes.map.js: list/basic */
        { path: 'basic', component: () => import(/* webpackChunkName: "demo" */ './views/list/basic.vue'), name: 'demo.list', meta: {title:'基础列表',crumb:'基础列表'} },
        /* for routes.map.js: list/localList */
        { path: 'localList', component: () => import(/* webpackChunkName: "demo" */ './views/list/localList.vue'), name: 'demo.localList', meta: {title:'本地分页',crumb:'本地分页'} },
        /* for routes.map.js: list/tabs */
        { path: 'tabs', meta: {title:'列表页',crumb:{title:'列表页'}}, children: [
            { path: '', redirect: 'basic' },
            /* for routes.map.js: list/tabs/basic */
            { path: 'basic', name: 'demo.tabsList', meta: {title:'列表页',crumb:{title:'列表页'}} },
            /* for routes.map.js: list/tabs/localList */
            { path: 'localList', name: 'demo.tabs.localList', meta: {title:'本地分页',crumb:{title:'本地分页'}} },
            /* for routes.map.js: list/tabs/noPageList */
            { path: 'noPageList', name: 'demo.tabs.noPageList', meta: {title:'列表页(无分页)',crumb:{title:'列表页(无分页)'}} },
        ] },
    ] },
    /* for routes.map.js: micro */
    { path: 'micro', component: require('cloud-ui.vusion/src/layouts/l-wrapper.vue').default, children: [
        { path: '', redirect: 'cloud-admin-1**' },
        /* for routes.map.js: micro/cloud-admin-1** */
        { path: 'cloud-admin-1**', component: () => import(/* webpackChunkName: "demo" */ './views/micro/cloud-admin-1$$.vue') },
        /* for routes.map.js: micro/cloud-admin-2** */
        { path: 'cloud-admin-2**', component: () => import(/* webpackChunkName: "demo" */ './views/micro/cloud-admin-2$$.vue') },
    ] },
    /* for routes.map.js: list/~tabs/basic */
    { path: 'list/tabs/basic', component: () => import(/* webpackChunkName: "demo" */ './views/list/~tabs/basic.vue') },
    /* for routes.map.js: list/~tabs */
    { path: 'list/tabs', component: () => import(/* webpackChunkName: "demo" */ './views/list/~tabs/index.vue') },
    /* for routes.map.js: list/~tabs/localList */
    { path: 'list/tabs/localList', component: () => import(/* webpackChunkName: "demo" */ './views/list/~tabs/localList.vue') },
    /* for routes.map.js: list/~tabs/noPageList */
    { path: 'list/tabs/noPageList', component: () => import(/* webpackChunkName: "demo" */ './views/list/~tabs/noPageList.vue') },
    /* for routes.map.js: form */
    { path: 'form', meta: {title:'表单',crumb:'表单'}, children: [
        { path: '', redirect: 'basic' },
        /* for routes.map.js: form/basic */
        { path: 'basic', component: () => import(/* webpackChunkName: "demo" */ './views/form/basic.vue'), meta: {title:'基础表单',crumb:'基础表单'} },
        /* for routes.map.js: form/setting */
        { path: 'setting', component: () => import(/* webpackChunkName: "demo" */ './views/form/setting.vue'), name: 'demo.form.setting', meta: {title:'设置',crumb:'设置'} },
    ] },
    /* for routes.map.js: router */
    { path: 'router', meta: {title:'路由',crumb:'路由',locks:[{include:[/router/],params:['search','demo.router.list.page']}]}, children: [
        { path: '', redirect: 'list' },
        /* for routes.map.js: router/list */
        { path: 'list', component: () => import(/* webpackChunkName: "demo" */ './views/router/list.vue'), name: 'demo.router.list', meta: {title:'列表(路由)',crumb:'列表(路由)'} },
        /* for routes.map.js: router/setting */
        { path: 'setting', component: () => import(/* webpackChunkName: "demo" */ './views/router/setting.vue'), name: 'demo.router.setting', meta: {title:'设置',crumb:'设置'} },
        /* for routes.map.js: router/detail */
        { path: 'detail', component: () => import(/* webpackChunkName: "demo" */ './views/router/detail/index.vue'), name: 'demo.router.detail', meta: {title:'详情',crumb:'详情'}, children: [
            { path: '', redirect: 'info' },
            /* for routes.map.js: router/detail/info */
            { path: 'info', component: () => import(/* webpackChunkName: "demo" */ './views/router/detail/info.vue'), meta: {crumb:'详细信息'} },
            /* for routes.map.js: router/detail/monitor */
            { path: 'monitor', component: () => import(/* webpackChunkName: "demo" */ './views/router/detail/monitor.vue'), meta: {crumb:'监控'} },
        ] },
    ] },
] }