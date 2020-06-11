import user from './services/user';
import lang from './services/lang';
import instance from './services/instance';

export * from './utils';

// 模拟数据服务
export const service = {
    user,
    lang,
    instance,
};

export default {
    service,
    install(Vue) {
        const services = Vue.prototype.$services = Vue.prototype.$services || {};
        services.mock = service;
    },
};
