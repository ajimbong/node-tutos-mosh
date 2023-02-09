const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
 const token = req.header('x-auth-token');
 if(!token) return res.status(401).send('Access denied. No token provided');

 try{
     const payload = jwt.verify(token, 'my-super-top-secret');
     req.user = payload;
     next();
 }
 catch(ex){
    return res.status(400).send('Invalid Token');
 }

}