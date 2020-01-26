const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: String,
    aliases: Array,
    origin: String
});

module.exports = mongoose.model('Artist', artistSchema);