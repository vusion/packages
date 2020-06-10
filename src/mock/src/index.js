import user from './services/user';
import lang from './services/lang';

// 模拟数据服务
const mockService = {
    user,
    lang,
};

export default {
    service: mockService,
    install(Vue) {
        const services = Vue.prototype.$services = Vue.prototype.$services || {};
        services.mock = mockService;
    },
};
