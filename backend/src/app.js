require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app=express()//inicializando nossa aplicação

app.use(cors())
app.use(bodyParser.json())//para ele entender quando enviar uma requisão com informações em json
app.use(bodyParser.urlencoded({extended:false}))//para ele entender quando passar parametros via url

//passo a app para rota
require('./routes')(app)

module.exports = app;