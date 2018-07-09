const APP_NAME = 'lottery'

// {name: 'mxx', pwd: 123}

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
    try {
      let {name, password} = this.query
      // 编码
      token = jwt.sign({
        name: 'mxx',
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 设置 token 过期时间
      }, 'girl')
      code = 200
    } catch (e) {
      console.log(e, 'e')
      code = 500
    } finally {
      this.body = {code, token}
    }
  })

  //
  router.get(`/${APP_NAME}/win`, function * (next) {
    let data
    let code
    try {
      let token = this.headers.authorization
      // 解码
      let decoded = jwt.verify(token, 'girl')

      // console.log(decoded, 'decoded')
      let {name} = decoded

      if (name != 'mxx') {
        code = 403
        return
      }

      // 随机值
      data = Math.floor(Math.random() * 100)
      code = 200
    } catch (e) {
      code = 500
      console.log(e, 'e')
    } finally {
      this.body = {code, data}
    }
  })


}
