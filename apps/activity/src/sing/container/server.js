const APP_NAME = 'activity/sing'

module.exports = {
  getRecommend: (cont) => {
    let url = `/recommend/${cont}`
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(response => response.json())
      .then(res => {
        resolve(res.data)
      })
      .catch(() => {
        reject('error')
      })
    })
  },
  // 解析歌词
  lyric: (music) => {
    let url = `/${APP_NAME}/getLyric?music=${music}`

    return new Promise((resolve, reject) => {
      fetch(url)
      .then(response => response.json())
      .then(res => {
        resolve(res.data)
      })
      .catch(() => {
        reject('error')
      })
    })
  }
}
