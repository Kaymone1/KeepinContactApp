//Dependencies
const express = require('express')
const router = express.Router()
//require contacts model
const Contact = require('../models/contacts')


 // INDEX ROUTE -- list all of the contacts 
router.get('/', async (req, res) => {
    // render an index.ejs template w/list of contactss

    // add a database query to get the contacts 
    // render the template and pass the contacts from the database 
    const foundContacts = await Contact.find({})
    console.log(foundContacts)
    res.render('index.ejs', {
        contacts: foundContacts
    })
})

// NEW ROUTE to render "new.ejs"
router.get('/new', (req, res) => {
    res.render('new.ejs')
    // res.send('works')
})

// SHOW ROUTE to render "show.ejs" -- info about JUST ONE contact 
router.get('/:id', async (req, res) => {
    const foundContact = await Contact.findById(req.params.id)
    res.render('show.ejs', {
        contact: foundContact
    })
})

// EDIT ROUTE to render "edit.ejs" 
router.get('/:id/edit', async (req, res) => {
    const foundContact = await Contact.findById(req.params.id)
    res.render('edit.ejs', {
        contact: foundContact,
    })
})

// POST ROUTE "Create"
router.post('/', async (req, res) => {
    // res.send(req.body)
    try {
        const newContact = await Contact.create(req.body)
        // res.send(newContact)
        console.log(newContact)
        res.redirect('/contacts')
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

// PUT ROUTE - "Edit a contact"
router.put('/:id', async (req, res) => {
    try{
        req.body.readyToEat === 'on' ? req.body.readyToEat = true : req.body.readyToEat = false
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.redirect('/contacts' + updateContact.id)
    } catch (err) {
        console.log("ERROR IN EDIT: ", err)
        res.status(500).send(err)
    }

})

// DELETE ROUTE "Delete"
router.delete('/:id', async (req, res) => {
    try{
        const contact = await Contact.findByIdAndDelete(req.params.id)
        console.log(`Deleted contact: ${contact}`)
        res.redirect('/contacts')
    } catch (err){
        console.log("ERROR ON DELETE REQUEST: ", err)
        res.status(500).send(err)
    }
})

module.exports = router