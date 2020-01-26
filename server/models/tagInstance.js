const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Store x/y as percentage: x,y

const tagInstanceSchema = new Schema({
    artistId: String,
    styleIds: Array,
    photoCoords: String
});

module.exports = mongoose.model('TagInstance', tagInstanceSchema);