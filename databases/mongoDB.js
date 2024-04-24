const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Cluster00064:TGhsU3Jhblt5@cluster00064.boaznqa.mongodb.net/";

const connect_mongo = async () => {
    await mongoose.connect(mongoURI)
    .then(() => {
        mongoose.set('debug', true);
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(`error connecting to Mongo: ${err.message}`);
    })
}

module.exports = connect_mongo;