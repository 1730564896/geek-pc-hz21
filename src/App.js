import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Home from './pages/Layout'
import Login from './pages/Login'
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}
      </div>
      {/* 配置路由规则 */}
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </Router>
  )
}

export default App
