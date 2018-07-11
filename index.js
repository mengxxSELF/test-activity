// nwd - v0.1

'use strict'

var bd = require('bd')
var serve = require('koa-static')
var path = require('path')
var app = bd()

app.init()

app.middlewares()

app.listen(process.env.PORT || 9097, function () {
  console.log('listen on', process.env.PORT)
})

process.on('uncaughtException', function (err) {
  console.log(err)
  console.log(err.message)
  console.log(err.stack)
  process.exit()
})
