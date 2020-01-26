const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    title: String,
    geoTag: String
});

module.exports = mongoose.model('Location', locationSchema);