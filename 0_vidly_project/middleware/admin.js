// This is to implement role based authencation

module.exports = function(req, res, next){
    if(!req.user.isAdmin) return res.status(403).send('Access denied.');
    
    next();
}