const fs = require('fs');
const { expect } = require('chai');
const { getRoutesMapFromDir } = require('../lib/backend');
const { KEYWORD_DIRS, normalize, nestRoutes, renderRoutes } = require('../lib/utils');

process.chdir(__dirname);

describe('lib', () => {
    it('routes.map', () => {
        const routesMap = getRoutesMapFromDir('./views', {
            excludes: new RegExp(`(^|/)(${KEYWORD_DIRS.join('|')})/`, 'g'),
        });

        // fs.writeFileSync('./results/routesMap-1.json', JSON.stringify(routesMap, null, 4));
        expect(fs.readFileSync('./results/routesMap-1.json', 'utf8')).to.equal(JSON.stringify(routesMap, null, 4));
    });

    it('sub.routes.map', () => {
        const routesMap = getRoutesMapFromDir('./views/dashboard/account', {
            excludes: new RegExp(`(^|/)(${KEYWORD_DIRS.join('|')})/`, 'g'),
        });

        // fs.writeFileSync('./results/routesMap-2.json', JSON.stringify(routesMap, null, 4));
        expect(fs.readFileSync('./results/routesMap-2.json', 'utf8')).to.equal(JSON.stringify(routesMap, null, 4));
    });

    it('nest.routes', () => {
        const routesMap = getRoutesMapFromDir('./views/dashboard/account', {
            excludes: new RegExp(`(^|/)(${KEYWORD_DIRS.join('|')})/`, 'g'),
        });

        // fs.writeFileSync('./results/nestRoutes.js', renderRoutes(nestRoutes(routesMap, '/'), true));
        expect(fs.readFileSync('./results/nestRoutes.js', 'utf8')).to.equal(renderRoutes(nestRoutes(routesMap, '/'), true));
    });
});
