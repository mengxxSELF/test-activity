import React, { Component } from 'react'

import axios from 'axios'
import $ from 'jquery'

const APP_NAME = 'activity/lottery'
export default class Info extends Component {
  render() {
    let {data} = this.props
    return (
      <div style={{marginTop: 20}}>
        <div className="alert alert-info" role="alert">
          winners
        </div>
        <div>
          {
            data && data.length > 0 && data.map((item, index) => <p key={index}>{`恭喜 ${item['name']} 抓到 朱一龙 ${item['number']} 号  time: 2018${item['time']}  `} </p>)
          }
        </div>
      </div>
    )
  }
}
