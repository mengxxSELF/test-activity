/*
 * @Author: 孟闲闲 -- 抽奖翻盘
 * @Date: 2018-07-09 14:32:20
 * @Last Modified by: mxx
 * @Last Modified time: 2018-07-09 19:08:01
 */

import axios from 'axios'

const APP_NAME = 'activity/lottery'
import React, { Component } from 'react'
import Info from '../Info'
import moment from 'moment'

export default class Lottery extends Component {
  state = {data: []}
  getData () {
    axios.get(`/${APP_NAME}/lottery`)
    .then(({data}) => {
      let {code, data: all} = data

      if (all && all.length) {
        all = all.sort((a, b) => {
          return b['time'] - a['time']
        })
      }

      this.setState({data: all})
    })
    .catch((error) => {
      console.log(error)
    })
  }
  componentDidMount () {
    // 通过判断当前localStorage中是否有token参数
    let token = window.localStorage.getItem('token')
    if (token) {
      this.setState({isToken: true})
    }

    this.getData()
  }
  draw () {
    // 获取jwt --token
    let token = window.localStorage.getItem('token')
    // 获取用户名
    let username = window.localStorage.getItem('username')

    let time = moment().format('MMDDHHmm')

    axios.get(`/${APP_NAME}/win?username=${username}&time=${time}`, {
      headers: {
        Authorization: token
      }
    })
      .then(({ data }) => {
        let { number, code } = data
        let msg
        if (code == 200) {
          msg = `恭喜 ${username} 抓到 朱一龙 ${number}号`

          let {data: allData} = this.state
          allData.push({name: username, number, time })

          if (allData && allData.length) {
            allData = allData.sort((a, b) => {
              return b['time'] - a['time']
            })
          }

          this.setState({data: allData})
        } else {
          msg = '无权限抽奖，请先登录'
        }
        this.setState({ msg })
      })
      .catch((error) => {
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
    let { isToken = false, msg = '点击按钮抽奖', data } = this.state
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
        <Info data={data} />
      </div>
    )
  }
}
