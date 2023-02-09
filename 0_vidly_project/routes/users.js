const router = require('express').Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const {User} = require('../models/user')
const {validateUser: validate} = require('../helpers/validate');

// A secure to restrict the info of user
router.get('/me',auth, async (req, res)=>{
 try{
    let user = await User.findById(req.user._id);
    res.send(_.pick(user, ['name', 'email', 'isAdmin']))
 }catch(ex){
    return res.status(400).send(ex.message)
 }
})

router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status(400).send('User is already registered');
    
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const isAdmin = req.body.isAdmin ? true : false;

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            isAdmin: isAdmin
        });

        const data = await user.save();

        const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, 'my-super-top-secret');

        res.header('x-auth-token', token).send(_.pick(data, ['_id', 'name', 'email']));
    }
    catch(ex){
        return res.status(400).send(ex.message)
    }

})


module.exports = router