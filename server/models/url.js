const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const urls = mongoose.model("urls", urlSchema);
module.exports = {urls};