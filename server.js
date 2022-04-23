const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")
const methodoverride = require('method-override')

const bodyParser = require('body-parser');
const dotenv = require('dotenv');

//middleware
const {requireauth,checkuser} = require("./middleware/authmiddleware")

//Roūters
const Authrouter  = require('./routes/authcontroller')
const Indexrouter = require('./routes/index')
const Dashboardrouter = require('./routes/dashboard/dashboard')



dotenv.config({
	path:"./config/.env"
})

// require('./config/passport-setup')(passport);

//encrypting Cookies
// app.use(session({
//     secret:"keyboard cat",
//     resave:false,
//     saveUninitialized:false
// }))


    
//setting view engine as ejs
app.set('view engine','ejs')
app.set('views',__dirname+'/views')

//using express-ejs-layouts
app.set('layout','layouts/layout')
app.use(expressLayouts)

//setting public for static files
app.use(express.static('public'))

//other middlewares
app.use(methodoverride('_method'))
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cookieparser())
app.use("*",checkuser)

//connect to db
const connectDB = require('./config/db');
connectDB();

//setuping up routers
app.use(Authrouter)
app.use('/',Indexrouter)
app.use('/dashboard',Dashboardrouter)

app.listen(process.env.PORT || 3000,(err)=>{
    if(err)console.log(err)
    else console.log('app has started')
})