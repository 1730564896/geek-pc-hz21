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

// 获取用户信息
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: 'user/profile'
    })
}