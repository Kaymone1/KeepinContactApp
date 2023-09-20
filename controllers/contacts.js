// Dependencies
const express = require('express');
const router = express.Router();
// Require contacts model
const Contact = require('../models/contacts');

// INDEX ROUTE -- list all of the contacts
router.get('/', async (req, res) => {
    try {
        const foundContacts = await Contact.find({});
        console.log(foundContacts);
        res.render('index.ejs', {
            contacts: foundContacts
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// NEW ROUTE to render "new.ejs"
router.get('/new', (req, res) => {
    res.render('new.ejs', { contact: {} }); // Pass an empty object for the new contact
});

// SHOW ROUTE to render "show.ejs" -- info about JUST ONE contact
router.get('/:id', async (req, res) => {
    try {
        const foundContact = await Contact.findById(req.params.id);
        res.render('show.ejs', {
            contact: foundContact
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// EDIT ROUTE to render "edit.ejs"
router.get('/:id/edit', async (req, res) => {
    try {
        const foundContact = await Contact.findById(req.params.id);
        res.render('edit.ejs', {
            contact: foundContact,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// POST ROUTE "Create" new contact
router.post('/', async (req, res) => {
    try {
        const newContact = await Contact.create(req.body);
        console.log(newContact);
        res.redirect('/contacts');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// POST ROUTE "Update a contact"
router.post('/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.redirect(`/contacts/${updatedContact._id}`);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// DELETE ROUTE "Delete"
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        console.log(`Deleted contact: ${contact}`);
        res.redirect('/contacts');
    } catch (err) {
        console.log("ERROR ON DELETE REQUEST: ", err);
        res.status(500).send(err);
    }
});

module.exports = router;
