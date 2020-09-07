const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    title: String,
    description: String,
    timeStamp: Date,
    locationId: String,
    tagInstanceIds: Array,
    imageUrl: String,
    contributor: String,
    postId: String
});

module.exports = mongoose.model('Photo', photoSchema);