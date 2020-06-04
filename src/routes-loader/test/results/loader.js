import * as lodash from 'lodash';

export default { path: 'demo', component: require('cloud-ui.vusion/src/layouts/l-wrapper.vue').default, children: [
    { path: '', redirect: 'detail' },
    /* 'detail' */
    { path: 'detail', component: () => import(/* webpackChunkName: "demo" */ './views/detail/index.vue'), name: 'demo.detail', meta: {title:'详情',crumb:'详情'}, children: [
        /* 'detail/:monitor?' */
        { path: ':monitor?', component: () => import(/* webpackChunkName: "demo" */ './views/detail/_monitor_.vue') },
        /* 'detail/info' */
        { path: 'info', component: () => import(/* webpackChunkName: "demo" */ './views/detail/info.vue'), meta: {crumb:'详细信息'} },
        /* 'detail/monitor' */
        { path: 'monitor', meta: {crumb:'监控'} },
    ] },
    /* 'list' */
    { path: 'list', component: require('cloud-ui.vusion/src/layouts/l-wrapper.vue').default, children: [
        { path: '', redirect: 'basic' },
        /* 'list/basic' */
        { path: 'basic', component: () => import(/* webpackChunkName: "demo" */ './views/list/basic.vue'), name: 'demo.list', meta: {title:'基础列表',crumb:'基础列表'} },
        /* 'list/localList' */
        { path: 'localList', component: () => import(/* webpackChunkName: "demo" */ './views/list/localList.vue'), name: 'demo.localList', meta: {title:'本地分页',crumb:'本地分页'} },
        /* 'list/tabs' */
        { path: 'tabs', component: require('cloud-ui.vusion/src/layouts/l-wrapper.vue').default, meta: {title:'列表页',crumb:{title:'列表页'}}, children: [
            { path: '', redirect: 'basic' },
            /* 'list/tabs/basic' */
            { path: 'basic', name: 'demo.tabsList', meta: {title:'列表页',crumb:{title:'列表页'}} },
            /* 'list/tabs/localList' */
            { path: 'localList', name: 'demo.tabs.localList', meta: {title:'本地分页',crumb:{title:'本地分页'}} },
            /* 'list/tabs/noPageList' */
            { path: 'noPageList', name: 'demo.tabs.noPageList', meta: {title:'列表页(无分页)',crumb:{title:'列表页(无分页)'}} },
        ] },
    ] },
    /* 'micro' */
    { path: 'micro', component: require('cloud-ui.vusion/src/layouts/l-wrapper.vue').default, children: [
        { path: '', redirect: 'cloud-admin-1**' },
        /* 'micro/cloud-admin-1**' */
        { path: 'cloud-admin-1**', component: () => import(/* webpackChunkName: "demo" */ './views/micro/cloud-admin-1$$.vue') },
        /* 'micro/cloud-admin-2**' */
        { path: 'cloud-admin-2**', component: () => import(/* webpackChunkName: "demo" */ './views/micro/cloud-admin-2$$.vue') },
    ] },
    /* 'list/~tabs/basic' */
    { path: 'list/tabs/basic', component: () => import(/* webpackChunkName: "demo" */ './views/list/~tabs/basic.vue') },
    /* 'list/~tabs' */
    { path: 'list/tabs', component: () => import(/* webpackChunkName: "demo" */ './views/list/~tabs/index.vue') },
    /* 'list/~tabs/localList' */
    { path: 'list/tabs/localList', component: () => import(/* webpackChunkName: "demo" */ './views/list/~tabs/localList.vue') },
    /* 'list/~tabs/noPageList' */
    { path: 'list/tabs/noPageList', component: () => import(/* webpackChunkName: "demo" */ './views/list/~tabs/noPageList.vue') },
    /* 'form' */
    { path: 'form', component: require('cloud-ui.vusion/src/layouts/l-wrapper.vue').default, meta: {title:'表单',crumb:'表单'}, children: [
        { path: '', redirect: 'basic' },
        /* 'form/basic' */
        { path: 'basic', component: () => import(/* webpackChunkName: "demo" */ './views/form/basic.vue'), meta: {title:'基础表单',crumb:'基础表单'} },
        /* 'form/setting' */
        { path: 'setting', component: () => import(/* webpackChunkName: "demo" */ './views/form/setting.vue'), name: 'demo.form.setting', meta: {title:'设置',crumb:'设置'} },
    ] },
    /* 'router' */
    { path: 'router', component: require('cloud-ui.vusion/src/layouts/l-wrapper.vue').default, meta: {title:'路由',crumb:'路由',locks:[{include:[/router/],params:['search','demo.router.list.page']}]}, children: [
        { path: '', redirect: 'list' },
        /* 'router/list' */
        { path: 'list', component: () => import(/* webpackChunkName: "demo" */ './views/router/list.vue'), name: 'demo.router.list', meta: {title:'列表(路由)',crumb:'列表(路由)'} },
        /* 'router/setting' */
        { path: 'setting', component: () => import(/* webpackChunkName: "demo" */ './views/router/setting.vue'), name: 'demo.router.setting', meta: {title:'设置',crumb:'设置'} },
        /* 'router/detail' */
        { path: 'detail', component: () => import(/* webpackChunkName: "demo" */ './views/router/detail/index.vue'), name: 'demo.router.detail', meta: {title:'详情',crumb:'详情'}, children: [
            { path: '', redirect: 'info' },
            /* 'router/detail/info' */
            { path: 'info', component: () => import(/* webpackChunkName: "demo" */ './views/router/detail/info.vue'), meta: {crumb:'详细信息'} },
            /* 'router/detail/monitor' */
            { path: 'monitor', component: () => import(/* webpackChunkName: "demo" */ './views/router/detail/monitor.vue'), meta: {crumb:'监控'} },
        ] },
    ] },
] }