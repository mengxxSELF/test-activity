const APP_NAME = 'sing'
const {lyric} = require('../utils/api.js')
const urllib = require('urllib')

module.exports = (router) => {
  router.get(`/${APP_NAME}`, function * (next) {
    yield this.render('sing')
  })

  // 歌词解析
  router.get(`/${APP_NAME}/getLyric`, function * () {
    let {music} = this.query
    let code
    let data
    try {
      // 这个API接口 汉字需要编码
      music = encodeURIComponent(music)
      // 需要首先拿到歌曲ID
      let url = `${lyric}method=baidu.ting.search.catalogSug&query=${music}`
      let {data: musicData} = yield urllib.requestThunk(url) || {}

      let {song = [], album = [], artist = []} = JSON.parse(musicData)

      let songs = [].concat(song, album, artist)

      data = yield songs.map(function * ({songid, artistid, albumid, artistname, artistpic}) {
        if (songid || artistid || albumid) {
          let id = songid || artistid || albumid
          // 获取歌词
          let lyricUrl = `${lyric}method=baidu.ting.song.lry&songid=${id}`
          let {data} = yield urllib.requestThunk(lyricUrl) || {}

          let {lrcContent} = JSON.parse(data)
          // 需要将歌词中的字符去除掉
          let playUrl = `${lyric}method=baidu.ting.song.playAAC&songid=${songid}`
          let {data: playData} = yield urllib.requestThunk(playUrl) || {}
          let {bitrate, songinfo} = JSON.parse(playData)
          let {file_link} = bitrate || {}
          let {pic_big} = songinfo || {}

          return {
            singer: artistname,
            id: songid,
            lyric: lrcContent || '暂无查看权限',
            play: file_link,
            cover: pic_big || artistpic
          }
        }
      })
      // 去除掉null的值
      data = data.filter(item => item)
      code = 200
    } catch (e) {
      console.log(e)
      code = 500
      data = []
    } finally {
      this.body = {
        code,
        data
      }
    }
  })

}
