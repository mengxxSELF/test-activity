/*
 * @Author: 孟闲闲   -- 登录
 * @Date: 2018-07-09 14:33:53
 * @Last Modified by: mxx
 * @Last Modified time: 2018-07-09 16:44:45
 */

import React, { Component } from 'react'

import axios from 'axios'

const APP_NAME = 'activity/lottery'

export default class Login extends Component {
  login () {
    axios.get(`/${APP_NAME}/login?name=mxx&password=123`)
    .then(function ({data}) {
      let {token} = data
      // 将token存在本地
      window.localStorage.setItem('token', token)
      window.location.hash = 'lottery'
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <form>
        <div className="form-group">
          <label>username</label>
          <input className="form-control" placeholder="Enter name" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" />
        </div>
        <button className="btn btn-primary" onClick={() => this.login()}>Submit</button>
      </form>
    )
  }
}
