// 模拟后端请求
export const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));
