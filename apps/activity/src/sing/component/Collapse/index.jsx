import React from 'react'
import './index.scss'

import { Collapse, Button, Icon,  Row, Col  } from 'antd'
const Panel = Collapse.Panel

export default ({data, player, playIndex}) => {
  return (
    <Collapse accordion className='music' >
      {
        data.map(({singer, id, lyric, cover, play}, index) => {
          // 封面图
          cover = cover || require('../img/can.jpg')

          // 使用正则处理歌词内容
          if (lyric) {
            lyric = lyric.split(/\[.+\]/)
            // lyric = lyric.split(/\[(\d+:\d+\.\d+)+\]/)
            lyric = lyric.filter(item => item && item !== '↵' && !Boolean(/\d+:\d+\.\d+/g.test(item)) )
            lyric = lyric.map((item) => {
              return `<p>${item}</p>`
            })
            lyric = lyric.join('')
          }

          let isPlay = index == playIndex
          return (
            <Panel header={`${singer} ${!play ? '本歌曲非VIP用户无法播放' : ''}`} key={index}>
              <Row>
                <Col span="10">
                  <figure>
                    <p data-singer={singer} />
                    <img src={cover} />
                    {/* 有的歌曲是VIP 不提供播放功能 */}
                    {
                      play && <Icon type={isPlay ? 'pause-circle' : 'play-circle'} onClick={() => player(play, index)} />
                    }
                  </figure>
                  {/* 有的歌曲是VIP 不提供下载功能 */}
                  {
                    play && <Button>
                      <a href={play} type="primary"> <Icon type="download" /> 下载到本地 </a>
                    </Button>
                  }
                </Col>
                <Col span="14">
                  <Collapse defaultActiveKey="1">
                    <Panel header={'查看歌词'} key={id}>
                      <div style={{lineHeight: '24px'}} dangerouslySetInnerHTML={{__html: lyric}} />
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            </Panel>
          )
        })
      }
    </Collapse>
  )
}
