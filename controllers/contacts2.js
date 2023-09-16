//handle all the crud ops here
//Dependencies
const express = require('express')
const router = express.Router()
//require contacts model
const Contact = require('../models/contacts')


//test route
router.get('/', (req, res) => {
    res.send('Hello world!')
 })

 module.exports = router