var express = require('express')
var path =require("path")
var bodyParser = require('body-parser');
var app = express()
var router = require('./router/index')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router)

app.listen(3000,function(){
    console.log('启动成功')
})