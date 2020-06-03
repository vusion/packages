[
    /* for routes.map.js: '' */
    { path: '/', component: require('./views/index.vue').default, children: [
        { path: '', redirect: 'center' },
        /* for routes.map.js: 'center' */
        { path: 'center', component: require('./views/center.vue').default },
        /* for routes.map.js: 'leaf' */
        { path: 'leaf', component: require('./views/leaf.vue').default },
        /* for routes.map.js: 'security' */
        { path: 'security', component: require('./views/security.vue').default },
        /* for routes.map.js: 'setting' */
        { path: 'setting', component: require('./views/setting.vue').default },
    ] },
]