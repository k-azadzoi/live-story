// #1
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const connectDB = require('./config/db')

// Load config file for our global variables 
dotenv.config({ path: './config/config.env' })

//Passport config
require('./config/passport')(passport)

connectDB()

//Initialize 
const server = express()

// Body parser
server.use(express.urlencoded({ extended: false }))
server.use(express.json())


//Logging
if (process.env.NODE_ENV === 'development') {
    // shows the HTTP method in the console 
    server.use(morgan('dev'))
} 

//Handlebars helpers

const { formatDate, stripTags, truncate } = require('./helpers/hbs')

//Handlebars
server.engine('.hbs', exphbs({ helpers: { formatDate, stripTags, truncate }, defaultLayoutextname: 'main', extname: '.hbs' }))
server.set('view engine', '.hbs')

//Session middleware
server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }))

//Passport middleware
//passport.initialize() middleware is required to initialize Passport
server.use(passport.initialize());
server.use(passport.session());

//Static folder
server.use(express.static(path.join(__dirname, 'public')))

//Routes
server.use('/', require('./routes/index'))
server.use('/auth', require('./routes/auth'))
server.use('/stories', require('./routes/stories'))



const PORT = process.env.PORT || 3000

server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

