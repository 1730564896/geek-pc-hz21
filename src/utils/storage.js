const TOKEN_KEY = 'token-geek-pc-hz21'

// 保存token
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

// 获取token
export const getToken = () => localStorage.getItem(TOKEN_KEY)

// 删除token
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

// 判断是否有token
export const hasToken = () => !!getToken()