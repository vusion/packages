const JS = require('javascript-stringify');

/**
 * 关键词目录
 * 内部不应该有与路由相关的视图
 */
exports.KEYWORD_DIRS = [
    'assets',
    'components',
    'directives',
    'filters',
    'mixins',
    'utils',
    'styles',
    'service',
    'module',
];

/**
 * 占位型目录
 * 只是为了方便归类视图文件，占位目录名不体现在路径上
 */
exports.HOLDER_DIRS = [
    'views',
    'layout',
];

exports.WRAPPER_PATH = 'cloud-ui.vusion/src/layouts/l-wrapper.vue';

/**
 * 对路由进行规范化
 * @param routePath 路由路径
 * @TODO ~类型比较特殊
 */
exports.normalize = (routePath) => routePath
    .replace(new RegExp(`(^|/)(${exports.HOLDER_DIRS.join('|')})($|/)`, 'g'), '$1')
    .replace(/(^|\/)_/g, '$1:')
    .replace(/_($|\/)/g, '?$1')
    .replace(/\$/g, '*')
    .replace(/\/$/g, '');

exports.createRoute = function createRoute(routePath) {
    const cap = routePath.match(/(.*)\/(.*)/);
    const [m, parentPath, currentPath] = cap || [null, '', routePath];

    const route = {
        path: routePath.includes('~') ? routePath.replace(/~/g, '') : currentPath,
        parentPath: routePath.includes('~') ? '' : parentPath,
        routePath,
    };

    return route;
};

exports.normalizeRoute = function normalizeRoute(routePath, route) {
    const newRoute = exports.createRoute(routePath);
    if (route.path !== undefined)
        newRoute.path = route.path;
    return Object.assign(route, newRoute);
};

const _mergeRoutesMap = function (routes1, routes2) {
    if (!routes2)
        return routes1;
    Object.keys(routes2).forEach((key) => {
        if (routes1[key]) {
            routes1[key] = Object.assign(routes1[key], routes2[key]);
        } else {
            key && console.warn('[routes-loader][warning] 该路由在目录结构中没有实体，请检查: ' + key);
            routes1[key] = routes2[key];
        }
    });
    return routes1;
};
/**
 * 合并 routesMap
 */
exports.mergeRoutesMap = (...args) => args.reduceRight((acc, cur) => _mergeRoutesMap(cur, acc));

/**
 * 将 routesMap 转换为嵌套路由
 */
exports.nestRoutes = function (routesMap, rootPath = '', restRedirect = false) {
    const routes = [];

    const parse = function (route) {
        if (route.routePath === '')
            return;

        if (route.parentPath === undefined)
            route.parentPath = '';

        let parent = routesMap[route.parentPath];
        if (!parent) {
            parent = exports.createRoute(route.parentPath);
            parent.filePath = exports.WRAPPER_PATH;
            routesMap[route.parentPath] = parent;
            parse(parent);
        }

        parent.children = parent.children || [];
        parent.children.push(route);
    };

    Object.keys(routesMap).forEach((routePath) => parse(routesMap[routePath]));
    // 补充首个路由
    Object.keys(routesMap).forEach((routePath) => {
        const route = routesMap[routePath];
        if (route.children && route.children.length) {
            const firstChild = route.children.find((child) => child.first) || route.children[0];
            if (firstChild.path[0] !== ':')
                route.children.unshift({ path: '', redirect: firstChild.path });
        }
    });
    routes.push(routesMap['']);

    routes[0].path = rootPath;
    if (restRedirect)
        routes.push({ path: '*', redirect: restRedirect === true ? rootPath : restRedirect });

    return routes;
};

/**
 * 拼接为 JS 字符串
 */
exports.renderRoute = function (route, comments = false, level = 0) {
    const indent = ' '.repeat(level * 4);

    const properties = [];
    properties.push(`path: '${route.path}'`);
    /* eslint-disable multiline-ternary */
    route.filePath && properties.push(route.chunkName
        ? `component: () => import(/* webpackChunkName: "${route.chunkName}" */ '${route.filePath.replace(/\\/g, '/')}')`
        : `component: require('${route.filePath.replace(/\\/g, '/')}').default`);
    route.name && properties.push(`name: '${route.name}'`);
    route.components && properties.push(`components: ${JS.stringify(route.components)}`);
    route.redirect && properties.push(`redirect: '${route.redirect}'`);
    route.props && properties.push(`props: ${JS.stringify(route.props)}`);
    route.alias && properties.push(`alias: '${route.alias}'`);
    route.caseSensitive && properties.push(`caseSensitive: '${route.caseSensitive}'`);
    route.pathToRegexpOptions && properties.push(`pathToRegexpOptions: '${route.pathToRegexpOptions}'`);
    route.beforeEnter && properties.push(`beforeEnter: ${JS.stringify(route.beforeEnter)}`);
    route.meta && properties.push(`meta: ${JS.stringify(route.meta)}`);
    route.children && properties.push(`children: ${exports.renderRoutes(route.children, comments, level + 1)}`);
    return indent + `{ ${properties.join(', ')} }`;
};

/**
 * 拼接为 JS 字符串
 */
exports.renderRoutes = function (routes, comments = false, level = 1) {
    const indent = ' '.repeat((level - 1) * 4);
    return '[\n' + routes.map((route) => {
        const indent = ' '.repeat(level * 4);
        return (comments && route.routePath !== undefined ? indent + `/* for routes.map.js: '${route.routePath}' */\n` : '')
        + exports.renderRoute(route, comments, level) + ',\n';
    }).join('') + indent + ']';
};
