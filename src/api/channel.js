import request from 'utils/request'
// 获取文章列表
export function getChannels() {
    return request.get('/channels')
}