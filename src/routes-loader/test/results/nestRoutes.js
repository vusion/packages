[
    /* '' */
    { path: '/', component: require('./views/index.vue').default, children: [
        { path: '', redirect: 'center' },
        /* 'center' */
        { path: 'center', component: require('./views/center.vue').default },
        /* 'leaf' */
        { path: 'leaf', component: require('./views/leaf.vue').default },
        /* 'security' */
        { path: 'security', component: require('./views/security.vue').default },
        /* 'setting' */
        { path: 'setting', component: require('./views/setting.vue').default },
    ] },
];
