const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    topText: String,
    middleText: String,
    bottomText: String,
    topColor: String,
    middleColor: String,
    bottomColor: String
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
