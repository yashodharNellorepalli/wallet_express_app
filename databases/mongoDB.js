const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURI = process.env.mongoURI;

const connect_mongo = async (callback) => {
    await mongoose.connect(mongoURI)
    .then(() => {
        mongoose.set('debug', true);
        console.log("Connected to MongoDB");
        callback(null);
    })
    .catch((err) => {
        console.log(`error connecting to Mongo: ${err.message}`);
        callback(err);
    })
}

module.exports = connect_mongo;