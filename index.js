require('dotenv').config()
const express = require('express')
const router = require('./router')
const { default: mongoose } = require('mongoose')
const app = express()
const cors = require('cors')
var http = require('http');

app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use('/', router)

setInterval(() => {
http.get("https://ecommerce-website-backend-lrot.onrender.com"); // Make a request to your app
http.get("https://react-ecommerce-backend-a9y3.onrender.com")
}, 40 * 1000);

app.listen(process.env.PORT)
mongoose.connect(process.env.mongoDB).then(()=>console.log("connected")).catch(err=>console.log(err))
