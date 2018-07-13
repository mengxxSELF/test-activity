const APP_NAME = 'lottery'
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const winnersFile = path.resolve(__dirname, '../lib/index.js')
const userFile = path.resolve(__dirname, '../lib/user.js')
const SECRET = 'girl'

// 处理异步
const BDPromise = require('bluebird').Promise

// 不使用服务器 直接使用文件来记录中奖
// 写入中奖信息
function writeLottery ({name, number, time}) {
  let old = readLottery() || []
  let newInfo = [].concat(old, [{name, number, time}])
  let info = JSON.stringify(newInfo)
  let result = fs.writeFileSync(winnersFile, info, 'utf-8')
}

// 读取中奖信息
function readLottery () {
  let result = fs.readFileSync(winnersFile, 'utf-8')
  return JSON.parse(result)
}


// 将每一位用户的{user, token} 保存起来
function writeUser({name, token}) {
  let old = allUsers() || []
  let newInfo = [].concat(old, [{name, token}])
  let info = JSON.stringify(newInfo)
  let result = fs.writeFileSync(userFile, info, 'utf-8')
}

// 读取中奖信息
function allUsers () {
  let result = fs.readFileSync(userFile, 'utf-8')
  return JSON.parse(result)
}

// 筛选某一位用户的token
function getUser (name) {
  let all = fs.readFileSync(userFile, 'utf-8')
  let result = JSON.parse(all)
  let number
  let user = result.reverse().find((item, index) => {
    number = index
    return item['name'] = name
  })
  // 返回该用户 以及其index
  return {user, number}
}

// 变更某一个user的 token
function changeUser ({name, token}) {
  let {index} = getUser(name)
  let getAllUsers = allUsers()
  // 删除
  getAllUsers.push({name, token})
  // 写入
  let info = JSON.stringify(getAllUsers)
  let result = fs.writeFileSync(userFile, info, 'utf-8')
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
      let {name = 'dva'} = this.query
      // 编码

      // 过期时间 设置20分钟
      let willInvalid = moment().add(20, 'minutes').unix()

      token = jwt.sign({
        name,
        exp: willInvalid, // 设置 token 过期时间
      }, SECRET)

      // console.log(token, 'token')

      // 将{user, token}写入
      // 先判断此用户有没有过token
      let {user, number} = getUser(name)
      if (user) {
        changeUser({ name, token })
      } else {
        writeUser({ name, token })
      }

      username = name
      code = 200
    } catch (e) {
      console.log(e, 'e')
      code = 500
      username = ''
    } finally {
      this.body = {code, token, username}
    }
  })

  // 点击抽奖
  router.get(`/${APP_NAME}/win`, function * (next) {
    let number
    let code
    try {
      let {username = 'dva', time} = this.query
      let token = this.headers.authorization

      // 解码
      let decoded = jwt.verify(token, SECRET)
      // console.log(decoded, 'decoded')
      let {name} = decoded

      // 将用户名与token进行查找 判断是否是最新的token
      let { user } = getUser(name)
      let { token: getToken } = user

      if (getToken != token) {
        console.log(username, '发现不是最新token')
        code = 501
        return
      }

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
      let { message } = e
      // console.log(message, 'message')
      // token失效过期
      if (message == 'jwt expired') {
        code = 501
      }
      console.log(e, 'e')
    } finally {
      this.body = {code, number}
    }
  })
}
