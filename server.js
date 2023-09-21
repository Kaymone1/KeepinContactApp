// IMPORTS
const express = require('express')
const app = express()
const methodOverride = require('method-override')


require('dotenv').config()

// MIDDLEWARE 
// this will parse the data create to "req.body object"
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'));

//call my port
const PORT = process.env.PORT

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


//using controller pages app.use
app.use('/contacts', contactsController)


//route to contacts controller
//landing page 
app.get('/', (req, res) => {
    res.render('welcome.ejs')
    // res.send('works')
})


app.listen(PORT, () => {
    console.log(`Server is listening on PORT: http://localhost:${PORT}`)
})
