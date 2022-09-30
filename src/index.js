import React from 'react';
import ReactDOM from 'react-dom'
// 导入antd组件库全局样式
import 'antd/dist/antd.min.css'
import './index.css';
import App from './App'
import 'moment/locale/zh-cn'
import locale from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.render(<ConfigProvider locale={locale}><App /></ConfigProvider>, document.getElementById('root'))


