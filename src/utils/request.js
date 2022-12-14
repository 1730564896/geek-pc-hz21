import axios from 'axios'
import { hasToken, getToken, removeToken } from 'utils/storage'
import history from 'utils/history'
import { message } from 'antd'

export const baseURL = 'http://geek.itheima.net/v1_0/'
const instance = axios.create({
    baseURL,
    timeout: 5000
})

// 配置拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (hasToken()) {
        config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data
}, function (error) {
    // 对响应错误做点什么
    if (!error.response) {
        // 如果error信息中没有response，一般是由于网络超时导致
        message.error('网络繁忙,请稍后重试')
        return Promise.reject('网络繁忙,请售后重试')
    }
    if (error.response.status === 401) {
        // 代表token过期了
        // 1.删除token
        removeToken()
        // 2.提示消息
        message.warn('登录信息已过期')
        // 3.跳转到登录页
        // window.location.href = '/login' 缺点是会重新刷新页面
        history.push('/login')
    }
    return Promise.reject(error)
})
export default instance