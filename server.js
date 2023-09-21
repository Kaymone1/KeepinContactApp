// IMPORTS
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const PORT = process.env.PORT 
const session = require('express-session')
const bcrypt = require('bcrypt')



require('dotenv').config()

// MIDDLEWARE 
// this will parse the data create to "req.body object"
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false
    })
)

// setup database 
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI;

// connect to mongo 
mongoose.connect(mongoURI)

const db = mongoose.connection
// optional create status messages to check mongo connection 
db.on('error', (err) => { console.log('ERROR: ' , err)})
db.on('connected', () => { console.log('mongo connected')})
db.on('disconnected', () => { console.log('mongo disconnected')})

//Controllers
const contactsController = require('./controllers/contacts')


//route to contacts controller
//landing page 
app.get('/', (req, res) => {
    res.render('welcome.ejs')
    // res.send('works')
})

//baking cookies (session) I want to save data from user interactions with my site
app.get('/any', (req, res) => {
    req.session.anyProperty = 'something'
    res.redirect('/') 
})
//get back  data from past session
app.get('/fetch', (req, res) => {
    if (req.session.anyProperty === 'something') {
        //test to see if that value exists
        //do something if it's a match
        console.log('it matches! cool')
      } else {
        //do something else if it's not
        console.log('nope, not a match')
      }
      res.redirect('/') 
})

app.get('/updateSession', (req, res) => {
    req.session.anyProperty = 'not something'
    res.redirect('/') // '/' bc thats my home route
})


//contacts page
app.use('/contacts', contactsController)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: http://localhost:${PORT}`)
})
