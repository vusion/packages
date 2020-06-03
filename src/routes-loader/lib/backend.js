const fs = require('fs');
const path = require('path');
const globby = require('globby');
const { createRoute, normalize } = require('../lib/utils');

/**
 * 从目录中获得路由 Map
 * @param basePath 基础路径，相对路径
 */
exports.getRoutesMapFromDir = function getRoutesMapFromDir(basePath, filters = {}) {
    // 递归目录效率低，而且递归出来的树结构不一定是最终结构，直接用 globby 一把获取所有的路径
    const routesMap = {};
    globby.sync(['**/*.{vue,md}', '!**/node_modules', '!**/.git', '!**/*.vue/docs/*.md', '!**/*.blocks/**'], { cwd: basePath })
        .filter((filePath) => {
            filePath = filePath.replace(/\\/g, '/');

            if (filters.type) {
                const stat = fs.statSync(filePath);
                if (filters.type === 'file' && !stat.isFile())
                    return false;
                if (filters.type === 'directory' && !stat.isDirectory())
                    return false;
                if (filters.type === 'link' && !stat.isSymbolicLink())
                    return false;
            }
            if (filters.includes) {
                if (!Array.isArray(filters.includes))
                    filters.includes = [filters.includes];
                if (!filters.includes.every((include) => {
                    if (typeof include === 'string')
                        return filePath.includes(include);
                    else
                        return include.test(filePath);
                }))
                    return false;
            }
            if (filters.excludes) {
                if (!Array.isArray(filters.excludes))
                    filters.excludes = [filters.excludes];
                if (filters.excludes.some((exclude) => {
                    if (typeof exclude === 'string')
                        return filePath.includes(exclude);
                    else
                        return exclude.test(filePath);
                }))
                    return false;
            }
            if (filters.filters) {
                if (!Array.isArray(filters.filters))
                    filters.filters = [filters.filters];
                if (!filters.filters.every((filter) => filter(filePath)))
                    return false;
            }
            return true;
        }).forEach((filePath) => {
            filePath = filePath.replace(/\\/g, '/');
            let routePath = ('/' + filePath).replace(/(\/index)?\.(vue|md)$/, '').replace(/^\//, '');
            routePath = normalize(routePath);

            const route = createRoute(routePath);
            route.filePath = './' + filePath;
            // route.fullPath = path.resolve(basePath, filePath);

            routesMap[routePath] = route;
        });

    return routesMap;
};
