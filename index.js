const express = require('express')
const path = require('path')
const routes = require('./routes')

var app = express()

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "content-type")
    res.setHeader("Access-Control-Allow-Credentials", true)
    next()
})

app.use(express.static(path.join(__dirname, '/public')))

app.use('/', routes)

app.get('/', function (req, res) {
    res.redirect('/home')
})

var server = app.listen(3000, function () {
    console.log("Escutando em localhost:3000")
})

server.setTimeout(600000);