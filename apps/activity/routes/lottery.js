const APP_NAME = 'lottery'

// {name: 'who', pwd: 123}

const SECRET = 'girl'

// jwt
let jwt = require('jsonwebtoken')

module.exports = (router) => {
  router.get(`/${APP_NAME}`, function * (next) {
    yield this.render('lottery')
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
      let {username} = this.query
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
      code = 200
    } catch (e) {
      code = 500
      console.log(e, 'e')
    } finally {
      this.body = {code, number}
    }
  })
}
