const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const resolve = file => path.resolve(__dirname, file)
// var config = require('../build/webpack.base.config')
const app = express()
const api = require('./api')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

// redis配置信息   一般默认也就是这个
app.use(cookieParser())
app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    db: 1
  }),
  resave: false,
  saveUninitialized: true,
  secret: 'excited',
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}// 30 days
}))

// 请求跨域
app.all('*', function (req, res, next) {
  // if (req.headers.origin === 'http://127.0.0.1:8080' || req.headers.origin === 'http://127.0.0.1:9000') {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  // }
  next()
})

// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

app.set('port', (process.env.port || 9000))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use('/dist', express.static(resolve('../dist')))
app.use('/upload', express.static(resolve('./upload')))
app.use(api)

app.get('*', function (req, res) {
  const html = fs.readFileSync(resolve('../index.html'), 'utf-8')
  res.send(html)
})

app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})
