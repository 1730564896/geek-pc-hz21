import request from 'utils/request'

// 封装登录接口
export const login = (mobile, code) => {
    return request({
        method: 'POST',
        url: '/authorizations',
        data: {
            mobile,
            code
        }
    })
}