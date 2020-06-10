import { mockRequest } from '../utils';

// 模拟后端数据
const mockData = [
    { text: 'Batch', value: 'bat' },
    { text: 'C', value: 'c' },
    { text: 'C#', value: 'csharp' },
    { text: 'C++', value: 'cpp' },
    { text: 'CSS', value: 'css' },
    { text: 'Clojure', value: 'clojure' },
    { text: 'CoffeeScript', value: 'coffeescript' },
    { text: 'Coq', value: 'coq' },
    { text: 'Diff', value: 'diff' },
    { text: 'Dockerfile', value: 'dockerfile' },
    { text: 'F#', value: 'fshape' },
    { text: 'Go', value: 'go' },
    { text: 'Groovy', value: 'groovy' },
    { text: 'HLSL', value: 'hlsl' },
    { text: 'HTML', value: 'html' },
    { text: 'Handlebars', value: 'Handlebars' },
    { text: 'Ignore', value: 'ignore' },
    { text: 'Ini', value: 'ini' },
    { text: 'JSON', value: 'json' },
    { text: 'Java', value: 'java' },
    { text: 'JavaScript', value: 'javascript' },
    { text: 'Jinja', value: 'jinja' },
    { text: 'Jupyter', value: 'jupyter' },
    { text: 'Less', value: 'less' },
    { text: 'Log', value: 'log' },
    { text: 'Lua', value: 'lua' },
    { text: 'Makefile', value: 'makefile' },
    { text: 'Markdown', value: 'markdown' },
    { text: 'Objective-C', value: 'objective-c' },
    { text: 'Objective-C++', value: 'objective-cpp' },
    { text: 'PHP', value: 'php' },
    { text: 'Perl', value: 'perl' },
    { text: 'PowerShell', value: 'powershell' },
    { text: 'Properties', value: 'properties' },
    { text: 'Pug', value: 'jade' },
    { text: 'Python', value: 'python' },
    { text: 'R', value: 'r' },
    { text: 'Razor', value: 'razor' },
    { text: 'Ruby', value: 'ruby' },
    { text: 'Rust', value: 'rust' },
    { text: 'SCSS', value: 'scss' },
    { text: 'SQL', value: 'sql' },
    { text: 'SVG', value: 'svg' },
    { text: 'Shaderlab', value: 'shaderlab' },
    { text: 'Shell Script', value: 'shellscript' },
    { text: 'Swift', value: 'swift' },
    { text: 'TypeScript', value: 'typescript' },
    { text: 'Visual Basic', value: 'vb' },
    { text: 'Vue', value: 'vue' },
    { text: 'XML', value: 'xml' },
    { text: 'XSL', value: 'xsl' },
    { text: 'YAML', value: 'yaml' },
];

// 模拟构造数量较多的 500 条后端数据
const mockData2 = (() => {
    const mockData = [];
    const total = 500;
    for (let i = 1; i <= total; i++)
        mockData.push('item' + i);
    return mockData.map((text) => ({ text, value: text }));
})();

export default {
    loadShort() {
        return mockRequest([
            { text: 'Java', value: 'java' },
            { text: 'Node.js', value: 'nodejs' },
            { text: 'Go', value: 'go' },
            { text: 'Python', value: 'python' },
            { text: 'Ruby', value: 'ruby', disabled: true },
            { text: 'C', value: 'c' },
            { text: 'C#', value: 'csharp' },
            { text: 'C++', value: 'cpp' },
            { text: 'PHP', value: 'php', disabled: true },
        ]);
    },
    loadAll() {
        return mockRequest(mockData);
    },
    loadPartial(keyword) {
        // 在这里模拟了一个后端过滤数据的请求
        return mockRequest({
            total: mockData.length,
            data: mockData.filter((item) => item.text.includes(keyword)),
        });
    },
    loadWithTotal(keyword, offset, limit) {
        return mockRequest({
            total: mockData2.length,
            data: mockData2.filter((item) => item.text.includes(keyword)).slice(offset, offset + limit),
        });
    },
};
