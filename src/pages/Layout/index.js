import React, { Component } from 'react'
import styles from './index.module.scss'
import { Layout, Menu, message, Popconfirm } from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Switch, Route, Link } from 'react-router-dom'
import Home from '../Home'
import ArticleList from '../ArticleList'
import ArticlePublish from '../ArticlePublish'
import { removeToken } from 'utils/storage'
import { getUserProfile } from 'api/user'

const { Header, Content, Sider } = Layout

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const sub = ['数据概览', '内容管理', '发布文章']
    const location = ['/home', '/home/list', '/home/publish']
    return {
        key: location[index],
        icon: React.createElement(icon),
        label: <Link to={location[index]}>{sub[index]}</Link>
    }
})

export default class LayoutComponent extends Component {
    state = {
        profile: {}
    }
    async componentDidMount() {
        const res = await getUserProfile()
        // console.log(res)
        this.setState({ profile: res.data })
    }
    onConfirm = () => {
        // 清除token
        removeToken()
        // 跳转到登录页
        this.props.history.push('/login')
        // 退出提示
        message.success('退出成功')
    }
    render() {
        return (
            <div className={styles.layout}>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <div className="profile">
                            <span>{this.state.profile.name}</span>
                            <span>
                                <Popconfirm
                                    title="确认退出系统?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={this.onConfirm}
                                >
                                    <LogoutOutlined />{' '}退出
                                </Popconfirm>
                            </span>
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200}>
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={this.props.location.pathname}
                                style={{
                                    height: '100%',
                                    borderRight: 0,
                                }}
                                items={items2}
                            />
                        </Sider>
                        <Layout
                            style={{
                                padding: '24px',
                                overflow: 'auto'
                            }}
                        >
                            <Content
                                className="site-layout-background"
                            >
                                <Switch>
                                    <Route exact path="/home" component={Home}></Route>
                                    <Route path="/home/list" component={ArticleList}></Route>
                                    <Route path="/home/publish" component={ArticlePublish}></Route>
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

