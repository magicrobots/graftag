const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    timeStamp: Date
});

module.exports = mongoose.model('Post', postSchema);