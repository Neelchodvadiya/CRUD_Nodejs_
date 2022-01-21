const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/auther").then(() => {
    console.log("connection successfully");
}).catch((err) => {
    console.log("connectio failed ");
})