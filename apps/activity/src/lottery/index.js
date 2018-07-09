import React, {Component} from 'react'
import {render} from 'react-dom'
import { Route, HashRouter } from 'react-router-dom'
import Login from './container/Login'
import Lottery from './container/Lottery'
import './index.scss'

let root = document.getElementById('app')

class Cont extends Component {
  componentDidMount () {
    // // 设置页面最大宽度
    // let screenWidth = document.documentElement.clientWidth
    // let designWidth = 1920
    // document.documentElement.style.fontSize = `${screenWidth / designWidth * 100}px`
  }
  render () {
    return (
      <HashRouter>
        <div>
          {/* 报名 */}
          <Login exact path='/' component={Login} />
          {/* 抽奖 */}
          <Route exact path='/lottery' component={Lottery} />
        </div>
      </HashRouter>
    )
  }
}

render(<Cont />, root)
