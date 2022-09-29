import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { hasToken } from 'utils/storage'

export default class AuthRoute extends Component {
    render() {
        // console.log(this.props)
        const { component: Component, ...rest } = this.props
        return (
            <Route {...rest} render={(props) => {
                // console.log(props)
                if (hasToken()) {
                    // 有token，证明已经登录
                    return <Component {...props} />
                } else {
                    // 如果没有token,没有登录，直接渲染Redirect组件，跳转到登录页
                    // return <Redirect to="/login"></Redirect>
                    return (
                        // 跳转到登录页的时候，需要把当前地址传过去，登录成功之后再跳转过来
                        <Redirect to={{
                            pathname: '/login',
                            // 可通过search或者state传递参数,会显示在搜索栏地址后面
                            // search: `?from=${props.location.pathname}`
                            state: {
                                from: props.location.pathname
                            }
                        }}
                        ></Redirect>
                    )
                }
            }}></Route>
        )
    }
}
