require('dotenv').config()
const express = require('express')
const router = require('./router')
const { default: mongoose } = require('mongoose')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use('/', router)

app.listen(process.env.PORT)
mongoose.connect(process.env.mongoDB).then(()=>console.log("connected")).catch(err=>console.log(err))
