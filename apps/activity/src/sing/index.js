import React, {Component} from 'react'
import {render} from 'react-dom'
import Main from './container/main.jsx'
import './index.scss'

// ant design 样式文件
// import 'antd/dist/antd.css'

let root = document.getElementById('app')

class Cont extends Component {
  componentDidMount () {
    // // 设置页面最大宽度
    // let screenWidth = document.documentElement.clientWidth
    // let designWidth = 1920
    // document.documentElement.style.fontSize = `${screenWidth / designWidth * 100}px`
  }
  render () {
    return <Main />
  }
}

render(<Cont />, root)
