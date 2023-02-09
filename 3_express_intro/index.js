require('dotenv').config()
const express = require('express');
const app = express();
const config = require('config')
const morgan = require('morgan')
const port = process.env.PORT || config.get('server.port');
app.use(express.json())
app.use(function(req, res, next){
    console.log("Hello Ajim")
    next()
})

const home = require('./routes/index')
const books = require('./routes/books')

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'))
    console.log("We are in Development baby")
    console.log('PASS: ' + config.get('password'))
}

app.use('/', home)
app.use('/api/books', books)


app.listen(port, ()=> console.log(`${port} Running in ${config.name}!!🚀🚀`))