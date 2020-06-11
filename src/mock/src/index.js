import user from './services/user';
import lang from './services/lang';
import entity from './services/entity';

export * from './utils';

// 模拟数据服务
export const service = {
    user,
    lang,
    entity,
};

export default {
    service,
    install(Vue) {
        const services = Vue.prototype.$services = Vue.prototype.$services || {};
        services.mock = service;
    },
};
