const APP_NAME = 'lottery'
const fs = require('fs')
const path = require('path')
const userFile = path.resolve(__dirname, '../lib/index.js')
const SECRET = 'girl'
// 不使用服务器 直接使用文件来记录中奖
// 写入中奖信息
function writeLottery ({name, number, time}) {
  let old = readLottery() ||[]
  let newInfo = [].concat(old, [{name, number, time}])
  let info = JSON.stringify(newInfo)
  let result = fs.writeFileSync(userFile, info, 'utf-8')
}

// 读取中奖信息
function readLottery () {
  let result = fs.readFileSync(userFile, 'utf-8')
  return JSON.parse(result)
}

// jwt
let jwt = require('jsonwebtoken')

module.exports = (router) => {
  router.get(`/${APP_NAME}`, function * (next) {
    yield this.render('lottery')
  })

  // lottery
  router.get(`/${APP_NAME}/lottery`, function * (next) {
    let data = []
    let code
    try {
      data = readLottery().splice(0, 20)
      code = 200
    } catch (e) {
      code = 500
    } finally {
      this.body = {code, data}
    }
  })

  // login
  router.get(`/${APP_NAME}/login`, function * (next) {
    let code
    let token
    let username
    try {
      let {name = '', password} = this.query
      // 编码
      token = jwt.sign({
        name,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 设置 token 过期时间
      }, SECRET)

      console.log(token, 'token')

      username = name
      code = 200
    } catch (e) {
      console.log(e, 'e')
      code = 500
      username = ''
    } finally {
      // console.log(token, username, 'hhhhhhh')
      this.body = {code, token, username}
    }
  })

  // 点击抽奖
  router.get(`/${APP_NAME}/win`, function * (next) {
    let number
    let code
    try {
      let {username, time} = this.query
      let token = this.headers.authorization
      // 解码
      let decoded = jwt.verify(token, SECRET)
      // console.log(decoded, 'decoded')
      let {name} = decoded

      if (name != username) {
        code = 403
        return
      }

      // 随机值
      number = Math.floor(Math.random() * 100)
      writeLottery ({name, number, time})
      code = 200
    } catch (e) {
      code = 500
      console.log(e, 'e')
    } finally {
      console.log(code, number);
      this.body = {code, number}
    }
  })
}
