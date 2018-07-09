import React, {Component} from 'react'
import { message, Alert } from 'antd'
import {Search, Tab, Dropdown, Collapse, Blank} from '../component'
const server = require('./server.js')
import Music from './Music'
import './index.scss'

export default class Main extends Component {
  //       数据     展示数据组件类型   搜索🔍的功能
  state = {data: []}
  // 开启搜索
  searchCont () {
    let val = document.querySelector('.search input').value
    if (!val) {
      message.error('没有填写搜索内容呢')
      return
    }
    // 想server发送请求
    server['lyric'](val).then(data => {
      this.setState({data})
    }).catch(() => {
      this.setState({data: []})
    })
  }
  render () {
    let {data} = this.state
    return (
      <div className='main'>
        <img src={require('./bg.jpg')} />
        <Blank />
        <Search handleClick={() => this.searchCont()} />
        <Blank />
        {
          data && data.length > 0 && <Music data={data} />
        }
        {
          data && data.length < 1 && <Alert message="没有搜索结果呢" type="warn" />
        }
      </div>
    )
  }
}
