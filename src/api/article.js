// 封装和文章相关的请求
import request from 'utils/request'

// 获取文章列表
export const getArticles = (params) => {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

// 删除文章
export const delArticle = (id) => {
    return request.delete(`mp/articles/${id}`)
}

// 发表文章
export const addArticle = (data, draft) => {
    return request({
        url: `/mp/articles?draft=${draft}`,
        method: 'POST',
        data
    })
}

// 获取文章详情
export const getArticleById = (id) => {
    return request.get(`/mp/articles/${id}`)
}

// 编辑文章
export const updateArticle = (data, draft) => {
    return request({
        url: `/mp/articles/${data.id}?draft=${draft}`,
        method: 'PUT',
        data
    })
}