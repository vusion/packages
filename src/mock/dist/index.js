'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('./services/user');

var _user2 = _interopRequireDefault(_user);

var _lang = require('./services/lang');

var _lang2 = _interopRequireDefault(_lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 模拟数据服务
var mockService = {
    user: _user2.default,
    lang: _lang2.default
};

exports.default = {
    service: mockService,
    install: function install(Vue) {
        var services = Vue.prototype.$services = Vue.prototype.$services || {};
        services.mock = mockService;
    }
};