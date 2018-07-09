/*
 * @Author: 孟闲闲 -- 抽奖翻盘
 * @Date: 2018-07-09 14:32:20 
 * @Last Modified by: mxx
 * @Last Modified time: 2018-07-09 16:45:36
 */

import axios from 'axios'

const APP_NAME = 'activity/lottery'

import React, { Component } from 'react'

export default class Lottery extends Component {
  draw () {
    let token = window.localStorage.getItem('token')

    axios.get(`/${APP_NAME}/win`, {
      headers: {
        Authorization: token
      }
    })
      .then(function ({ data }) {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            点击按钮抽奖
          </div>
        </div>
        <button type="button" className="btn btn-info" onClick={() => this.draw()} >GO</button>
      </div>
    )
  }
}
