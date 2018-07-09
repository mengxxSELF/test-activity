/*
 * @Author: 孟闲闲 -- 抽奖翻盘
 * @Date: 2018-07-09 14:32:20
 * @Last Modified by: mxx
 * @Last Modified time: 2018-07-09 19:08:01
 */

import axios from 'axios'

const APP_NAME = 'activity/lottery'

import React, { Component } from 'react'

export default class Lottery extends Component {
  state = {}
  componentDidMount () {
    // 通过判断当前localStorage中是否有token参数
    let token = window.localStorage.getItem('token')
    if (token) {
      this.setState({isToken: true})
    }
  }
  draw () {
    // 获取jwt --token
    let token = window.localStorage.getItem('token')
    // 获取用户名
    let username = window.localStorage.getItem('username')

    axios.get(`/${APP_NAME}/win?username=${username}`, {
      headers: {
        Authorization: token
      }
    })
      .then(({ data }) => {
        let { number, code } = data
        let msg
        if (code == 200) {
          msg = `恭喜 ${username} 抓到 朱一龙 ${number}号`
        } else {
          msg = '无权限抽奖，请先登录'
        }
        this.setState({ msg })
      })
      .catch(function (error) {
        console.log(error);
        this.setState({ msg: '无权限抽奖，请先登录' })
      });
  }
  // 退出登录 - 清除localStorage的信息
  out () {
    window.localStorage.removeItem('token')
    window.location.hash = '/'
  }
  // 返回登录
  in() {
    window.location.hash = '/'
  }
  render() {
    let { isToken = false, msg = '点击按钮抽奖' } = this.state
    return (
      <div>
        <div className="card">
          <div className="card-body">
            {msg}
          </div>
        </div>
        <button type="button" className="btn btn-info" onClick={() => this.draw()} >GO</button>
        {
          isToken ?
            <button type="button" style={{ marginTop: 20, display: 'block' }} className="btn btn-dark" onClick={() => this.out()}>退出登录</button>
            :
            <button type="button" style={{ marginTop: 20, display: 'block' }} className="btn btn-dark" onClick={() => this.in()}>返回登录</button>
        }
      </div>
    )
  }
}
