const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const {User} = require('../models/user')
const {validateLoginUser: validate} = require('../helpers/validate');
const config = require('config');


router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        let user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Invalid email or password');
    
        const hashedPass = user.password;
        const validPassword = await bcrypt.compare(req.body.password, hashedPass);
        if(!validPassword) return res.status(400).send('Invalid email or password');
        
        const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, config.get('auth.secret'));

        res.header('x-auth-token', token).send('Success')
    }
    catch(ex){
        return res.status(400).send(ex.message)
    }

})


module.exports = router