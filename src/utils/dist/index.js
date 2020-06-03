'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.installComponents = installComponents;
exports.installDirectives = installDirectives;
exports.installFilters = installFilters;
exports.supportOverrideWatch = supportOverrideWatch;
exports.installOptions = installOptions;
exports.install = install;
/**
 * 将 Components 数组转换为对象
 * @deprecated
 * @param {Array} Components - 组件数组
 */
var mapComponents = exports.mapComponents = function mapComponents(Components) {
    var result = {};
    Components.forEach(function (Component) {
        var name = typeof Component === 'function' ? Component.options.name : Component.name;
        name && (result[name] = Component);
    });
    return result;
};

/**
 * 在 Vue 中安装组件
 * @param {Object|Array} Components - 组件集合
 * @param {Vue} Vue
 */
function installComponents(Vue, Components) {
    var caseRE = /^[A-Z]/;
    var blackList = ['directives', 'filters', 'utils', 'mixins', 'blocks', 'vendors', 'install', 'default'];

    // 组件之间有依赖，有 install 的必须先安装
    Object.keys(Components).forEach(function (key) {
        if (!caseRE.test(key)) {
            // 如果为大写则是组件
            if (!blackList.includes(key)) console.error('不允许组件名首字母小写', key, Components[key]);
            return;
        }

        var Component = Components[key];
        if (Component.install) {
            Vue.component(key, Component);
            Component.install(Vue, key);
        }
    });
    Object.keys(Components).forEach(function (key) {
        if (!caseRE.test(key)) {
            // 如果为大写则是组件
            if (!blackList.includes(key)) console.error('不允许组件名首字母小写', key, Components[key]);
            return;
        }

        var Component = Components[key];
        Vue.component(key, Component);
        if (!Component.install) {
            Vue.component(key, Component);
        }
    });
}

/**
 * 在 Vue 中安装指令
 * @param {Object} directives - 指令集合
 * @param {Vue} Vue - 全局的 Vue
 */
function installDirectives(Vue, directives) {
    Object.keys(directives).forEach(function (key) {
        return Vue.directive(key, directives[key]);
    });
}

/**
 * 在 Vue 中安装过滤器
 * @param {Object} filters - 过滤器集合
 * @param {Vue} Vue - 全局的 Vue
 */
function installFilters(Vue, filters) {
    Object.keys(filters).forEach(function (key) {
        return Vue.filter(key, filters[key]);
    });
}

var installValidators = exports.installValidators = function installValidators(Vue, validators) {
    Object.keys(validators).forEach(function (key) {
        Vue.validator(key, validators[key]);
    });
};

var installRules = exports.installRules = function installRules(Vue, rules) {
    Object.keys(rules).forEach(function (key) {
        Vue.rule(key, rules[key]);
    });
};

function supportOverrideWatch(Vue) {
    var nativeWatch = {}.watch;

    function extend(to, _from) {
        for (var key in _from) {
            to[key] = _from[key];
        }
        return to;
    }

    var strategies = Vue.config.optionMergeStrategies;

    // Modify from https://github.com/vuejs/vue/blob/dev/src/core/util/options.js#L208
    strategies.watch = function (parentVal, childVal) {
        // work around Firefox's Object.prototype.watch...
        if (parentVal === nativeWatch) parentVal = undefined;
        if (childVal === nativeWatch) childVal = undefined;
        /* istanbul ignore if */
        if (!childVal) return Object.create(parentVal || null);
        if (!parentVal) return childVal;
        var ret = {};
        extend(ret, parentVal);
        for (var key in childVal) {
            var parent = ret[key];
            var child = childVal[key];
            if (parent && !Array.isArray(parent)) parent = [parent];
            if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object' && child.override) ret[key] = [child];else {
                if (parent) ret[key] = parent.concat(child);else ret[key] = Array.isArray(child) ? child : [child];
            }
        }
        return ret;
    };
}

function installOptions(Vue) {
    // Compability i18n
    Vue.prototype.$t = Vue.prototype.$t || function (key, data) {
        var message = this.$options.i18n.messages['zh-CN'][key];
        if (data) return message.replace(/{(.*?)}/g, function (a, b) {
            return data[b];
        });

        return message;
    };

    // Support override supportOverrideWatch
    supportOverrideWatch(Vue);
}

/**
 * 在 Vue 中安装组件库
 * @param {Vue} Vue - 全局的 Vue
 * @param {Object} library - 包含组件，指令，过滤器
 */
function install(Vue, library) {
    if (!library) library = this; // eslint-disable-line

    installOptions(Vue);
    installComponents(Vue, library);

    library.directives && installDirectives(Vue, library.directives);
    library.filters && installFilters(Vue, library.filters);
    library.validators && installValidators(Vue, library.validators);
    library.rules && installRules(Vue, library.rules);
}