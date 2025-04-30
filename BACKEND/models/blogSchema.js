const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    author_email:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Blog", blogSchema);