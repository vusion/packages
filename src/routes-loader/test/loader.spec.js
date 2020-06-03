const fs = require('fs');
const { expect } = require('chai');
const loader = require('../');

process.chdir(__dirname);

describe('loader', () => {
    it('loader', () => {
        const resourcePath = './views/dashboard/demo/routes.map.js';

        const result = loader.call({
            resourceQuery: '?scopeName=demo',
            resourcePath,
            addContextDependency: () => null,
        }, fs.readFileSync(resourcePath, 'utf8'));

        // fs.writeFileSync('./results/loader.js', result);
        expect(fs.readFileSync('./results/loader.js', 'utf8')).to.equal(result);
    });
});
