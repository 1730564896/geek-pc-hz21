import React, { Component } from 'react'
import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import styles from './index.module.scss'
import { login } from 'api/user'
import logo from 'assets/logo.png'
import { setToken } from 'utils/storage'

export default class Login extends Component {
    state = {
        loading: false
    }
    onFinish = async (values) => {
        // console.log(values)
        this.setState({ loading: true })
        try {
            const res = await login(values.mobile, values.code)
            // console.log(res)
            // 登录成功
            // 1.保存token
            setToken(res.data.token)
            // console.log(this.props)
            // 2.提示消息, 跳转到首页
            // 判断location.state中是否有值
            const { state } = this.props.location
            if (state) {
                this.props.history.push(state.from)
            } else {
                message.success('登录成功', 1, () => {
                    this.props.history.push('/home')
                })
            }
        } catch (error) {
            // console.log(error)
            message.error(error.response.data.message, 1, () => {
                this.setState({ loading: false })
            })
        }
    }
    render() {
        return (
            <div className={styles.login}>
                <Card className="login-container">
                    <img src={logo} alt="" className="login-logo" />
                    {/* 表单 */}
                    <Form
                        size="large"
                        validateTrigger={['onChange', 'onBlur']}
                        onFinish={this.onFinish}
                        initialValues={{
                            agree: true,
                            mobile: '13911111111',
                            code: '246810'
                        }}
                    >
                        <Form.Item
                            name="mobile"
                            rules={[
                                {
                                    required: true,
                                    message: '手机号不能为空'
                                },
                                {
                                    pattern: /^1[3-9]\d{9}$/,
                                    message: '手机号格式不正确'
                                }
                            ]}
                        >
                            <Input placeholder="请输入手机号" autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: '验证码不能为空'
                                },
                                {
                                    pattern: /^\d{6}$/,
                                    message: '验证码格式不正确'
                                }
                            ]}
                        >
                            <Input placeholder="请输入验证码" autoComplete="off" />
                        </Form.Item>

                        <Form.Item
                            valuePropName="checked"
                            name="agree"
                            rules={[
                                {
                                    // 自定义校验规则
                                    validator(rule, value) {
                                        // console.log(value)
                                        if (value) {
                                            return Promise.resolve()
                                        } else {
                                            return Promise.reject(new Error('请阅读并同意用户协议'))
                                        }
                                    }
                                }
                            ]}
                        >
                            <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={this.state.loading}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
