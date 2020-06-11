import { mockRequest } from '../utils';

const mockData = [
    { id: 1, name: 'easy-code', description: '低代码平台' },
    { id: 2, name: 'vusion', description: 'Vusion 框架' },
    { id: 2, name: 'cloud-ui', description: 'Cloud UI 组件库' },
];

export default {
    loadList() {
        return mockRequest(mockData);
    },
    loadAll() {
        return mockRequest(mockData);
    },
    loadDetail(id) {
        return mockRequest(mockData.find((item) => item.id === +id));
    },
    create(params) {
        // 在这里模拟了一个后端过滤数据的请求
        return mockRequest({
            code: 200,
            success: true,
        });
    },
    update(params) {
        return mockRequest({
            code: 200,
            success: true,
        });
    },
};
