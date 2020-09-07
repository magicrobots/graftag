const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Current descriptions from https://graffitocanberra.wordpress.com/styles-of-graffiti/

const styleSchema = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Style', styleSchema);