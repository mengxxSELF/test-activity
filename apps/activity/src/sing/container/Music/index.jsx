import React, {Component} from 'react'
import {Collapse} from '../../component'

export default class Music extends Component {
  state = {playIndex: null}
  musicPlay (src, playIndex) {
    let targetMusic = window.audio
    if (!targetMusic) {
      window.audio = new Audio(src)
      window.audio.setAttribute('loop', 'loop')
    } else if (targetMusic && targetMusic.getAttribute('src') !== src) {
      window.audio.setAttribute('src', src)
    }
    let musicState = window.audio.paused
    if (musicState) {
      window.audio.play()
      this.setState({playIndex})
    } else {
      window.audio.pause()
      this.setState({playIndex: null})
    }
  }
  render () {
    let {data} = this.props
    let {playIndex} = this.state
    return (
      <Collapse data={data} playIndex={playIndex} player={(src, playIndex) => this.musicPlay(src, playIndex)}/>
    )
  }
}
