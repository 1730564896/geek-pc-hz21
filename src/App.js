// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import LayoutComponent from 'pages/Layout'
import Login from 'pages/Login'
import AuthRoute from 'components/AuthRoute'
import history from 'utils/history'

/* 
import { createBrowserHistory, createHashHistory } from 'history'

<BrowserRouter /> 等价于 <Router history={ createBrowserHistory()} />
<HashRouter/>  等价于 <Router history={createHashHistory()} />
*/
function App() {
  return (
    <Router history={history}>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}
      </div>
      {/* 配置路由规则 */}
      <Switch>
        <Redirect exact from="/" to="/home"></Redirect>
        <Route path="/login" component={Login}></Route>
        {/* <Route path="/home" component={LayoutComponent}></Route> */}
        {/* Route组件可以不使用component渲染， 使用render属性渲染，写入逻辑 */}
        <AuthRoute path="/home" component={LayoutComponent} />
      </Switch>
    </Router>
  )
}

export default App
