//const winston = require('winston');
module.exports = (err, req, res, next)=>{
    //winston.log(err.message);
    return res.status(400).send(err.message)
}