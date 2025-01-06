const mongoose = require('mongoose');
require("dotenv").config()

const dbConnect = async() => {
    try {
       await mongoose.connect(process.env.CONN_STRI);
       console.log("MongoDB Successfully Connected!")
    } catch (error) {
        console.log("Error Connecting to MongoDB\n", error)
    }
}
module.exports = dbConnect