'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

// 模拟构造 75 条后端数据
var mockData = function () {
    var baseData = [{ name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 }, { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 }, { name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 }, { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 }, { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 }];

    var result = [];
    for (var i = 0; i < 75; i++) {
        var item = Object.assign({}, baseData[i % 5]);
        item.name += '-' + (Math.random() * 20 >> 0);
        item.phone = String(+item.phone + (Math.random() * 10 >> 0) * Math.pow(10, Math.random() * 8 >> 0));
        item.createdTime += i * 1000 * 3600 * 24;
        item.loginTime += i * 1000 * 3600 * 24;
        result.push(item);
    }

    return result;
}();

exports.default = {
    loadShort: function loadShort() {
        return (0, _utils.mockRequest)([{ name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 }, { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 }, { name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 }, { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 }, { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 }]);
    },
    loadAll: function loadAll() {
        return (0, _utils.mockRequest)(mockData);
    },
    loadPageable: function loadPageable(offset, limit) {
        // 在这里模拟了一个后端分页的请求
        return (0, _utils.mockRequest)({
            total: mockData.length,
            data: mockData.slice(offset, offset + limit)
        });
    },
    loadPageableWithoutTotal: function loadPageableWithoutTotal(offset, limit) {
        // 在这里模拟了一个后端分页的请求
        return (0, _utils.mockRequest)(mockData.slice(offset, offset + limit));
    },
    loadPageableSortable: function loadPageableSortable(paging, sorting) {
        // 在这里模拟了一个后端排序和分页的请求
        var orderSign = sorting.order === 'asc' ? 1 : -1;
        return (0, _utils.mockRequest)({
            total: mockData.length,
            data: mockData.sort(function (item1, item2) {
                if (item1[sorting.field] === item2[sorting.field]) return 0;else return item1[sorting.field] > item2[sorting.field] ? orderSign : -orderSign;
            }).slice(paging.offset, paging.offset + paging.limit)
        });
    }
};