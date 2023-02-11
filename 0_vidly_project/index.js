require('express-async-errors');
const errorHandler = require('./middleware/errorHandler')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customer');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const auth = require('./routes/auth')
const users = require('./routes/users')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const winston = require('winston');
const port = process.env.PORT || 3000;

//TODO: Write some code to log errors with winston
// winston.add(new winston.transports.File, {filename: 'errors.log'})

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(errorHandler)

mongoose.set('strictQuery',  true);
mongoose.connect('mongodb://ajim-dev.local:27017/mongo-exercises')
//mongoose.connect('mongodb://192.168.18.146:27017/mongo-exercises')
 .then(()=> {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
 })
 .catch(err => console.error(`ERorR::: -------------------
${err}`))

//"mongoose": "^6.9.0"
