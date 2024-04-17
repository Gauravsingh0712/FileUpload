const mongoose = require('mongoose');
require('dotenv').config();

expoorts.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.log("database connection failed. exiting now...");
        console.error(err);
        process.exit(1);
    })
}
