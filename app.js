const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

const postsRoute = require('./routes/posts');

// MIDDLEWARE
app.use('/posts', postsRoute);
app.use(cors());

// ROUTES
app.get('/', (req, res) => {
    res.send('home pejdż');
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true , useNewUrlParser: true},
    () => {
    console.log('connected to DB');
});

app.listen(PORT, () => {

});
