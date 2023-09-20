require('dotenv').config();
const mongoose = require('mongoose');
const contacts = require('./models/contacts');
const mongoURI = process.env.MONGO_URI;

const db = mongoose.connection;

// connect to the database 
mongoose.connect(mongoURI);

// Event listener for successful database connection
db.once('open', async () => {
    console.log('Connected to MongoDB');

    console.log('Starting the Seed script');

    const seedData = [
        {
            name: "Ichigo Kurosaki",
            number: 505157,
            email: "IamASoulReaper@soulsociety.org",
            category: "Friend",
            comment: "Quincies are a sensitive topic; He CANNOT be around any Sternritters.",
        },
        {
            name: "Sasuke Uchiha",
            number: 356057,
            email: "RipItachi@rogueninja.org",
            category: "Friend",
            comment: "He tried to destroy the Hidden Leaf; friendship is questionable but NO Invites to Village festivals ",
        },
        {
            name: "Saturo Gojo",
            number: 750557,
            email: "ILoveMyStudents@JJKHigh.com",
            category: "Business",
            comment: "CALL FOR PROTECTION against high grade curses!!",
    
        },
        {
            name: "Monkey D. Luffy",
            number: 825057,
            email: "FuturePirateKing@Merryships.com",
            category: "Family",
            comment: "NO WATER ACTIVITIES; Anywhere he comes, HAVE FOOD",
        },
        {
            'name': "Killua Zoldyck",
            'number': 259557,
            'email': "Z.Assassins@heartStealers.net",
            'category': "Business",
            'comment': "Family of assassins; Stay on their good side!",
        }
    ];

    try {
        // Insert seed data into the database
        await contacts.insertMany(seedData);
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the database connection
        mongoose.disconnect();
    }
});

// Event listener for database connection error
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});