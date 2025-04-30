const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://pallavilagisetti2003:Pallavi@cluster0.cwcmr3j.mongodb.net/",);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = connection;