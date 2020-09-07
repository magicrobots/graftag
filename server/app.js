const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow Cross Origin Requests
app.use(cors());

const localMongo = 'mongodb://localhost:27017/graftag';

mongoose.connect(localMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log('connected to DB');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on Port 4000');
});