const mongoose = require('mongoose')
const contacts = require('./models/contacts')
const mongoURI = "mongodb+srv://kennyadb:Alex0510@mymongodb.9v90zlw.mongodb.net/?retryWrites=true&w=majority"

const db = mongoose.connection 

// connect to the database 
mongoose.connect(mongoURI)

// Event listener for successful database connection
db.once('open', async () => {
    console.log('Connected to MongoDB')


console.log('Starting the Seed script')

const seedData =[
     {
        name: "Ichigo Kurosaki",
        number: 555557,
        email: "IamASoulReaper@soulsociety.org",
        category: "Friend",
        comment: "He CANNOT be around any Sternrittlers",
    },
    {
        name: "Sasuke Uchiha",
        number: 5550057,
        email: "RipItachi@rogueninja.org",
        category: "Friend",
        comment: "He tried to destroy the Hidden Leaf; friendship is questionable but NO Invite to festivals ",

    },
    {
        name: "Saturo Gojo",
        number: 550557,
        email: "ILoveMyStudents@JJKHigh.com",
        category: "Business",
        comment: "CALL FOR PROTECTION against high grade curses!!",

    },
    {
        name: "Monkey D. Luffy",
        number: 555057,
        email: "FuturePirateKing@Merryships.com",
        category: "Family",
        comment: "NO POOL PARTIES; Anywhere he comes, HAVE FOOD",
    },
    {
        'name': "Killua Zoldyck",
        'number': 559557,
        'email': "Z.Assassins@heartStealers.net",
       'category': "Business",
        'comment': "Family of assassins",

    }
]
    try {
        // Insert seed data into the database
    await contacts.insertMany(seedData);
        console.log('Database seeded successfully!')
    } catch (error) {
        console.error('Error seeding database:', error)
    } finally {
        // Close the database connection
        mongoose.disconnect();
    }
})

// Event listener for database connection error
db.on('error', (error) => {
    console.error('MongoDB connection error:', error)
})
    