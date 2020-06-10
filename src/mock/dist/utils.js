"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 模拟后端请求
var mockRequest = exports.mockRequest = function mockRequest(data) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  return new Promise(function (res, rej) {
    return setTimeout(function () {
      return res(data);
    }, timeout);
  });
};