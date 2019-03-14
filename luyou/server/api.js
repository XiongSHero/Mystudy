// 存放后端管理api以及通用／上传api
const express = require('express')
const router = express.Router()
// const fs = require('fs')
const multer = require('multer')
const app = express()
// var upload = multer({ dest: 'upload' })
const mysql = require('mysql')
// var crypto = require('crypto')

// mysql连接信息配置
const connection = mysql.createConnection({
  host: 'localhost',
  password: 'root',
  user: 'root',
  database: 'movies',
  port: 3306// 你的数据库端口 一般是3306
})
connection.connect()

app.post('/api/login', function (req, res) {
  const data = req.body
  console.log(data)
  res.send({
    status: 0,
    msg: '222'
  })
})

module.exports = router
