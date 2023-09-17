const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    number: { 
        type: Number, 
        required: true
    },
    email: { 
        type: String, 
        required: true
    },
    category: { 
        type: String,
        enum: ['Family', 'Friend', 'Business'], 
        required: true
    },
    comment: { type: String,
    },
    image: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Contact', contactSchema);