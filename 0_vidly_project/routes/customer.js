const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Customer} = require('../models/customer')
const {validateCustomer} = require('../helpers/validate')

router.get('/', async (req, res)=>{
    const customers = await Customer.find();
    res.send(customers)
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById({_id: req.params.id});
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
  });

router.post('/', auth, async (req, res)=>{
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    try{
        const data = await customer.save();
        res.send(data);
    }
    catch(ex){
        return res.status(400).send(ex.message)
    }
});

router.put('/:id', auth, async (req, res) => {
    const {error} = validateCustomer(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    try{
        const data = await Customer.findByIdAndUpdate({_id: req.params.id}, {...req.body})
        res.send(data)
    }
    catch(ex){
        res.status(400).send(ex.message)
    }

})

router.delete('/:id',auth, admin, async (req, res)=>{
    try{
        const data = await Customer.findByIdAndDelete({_id: req.params.id})
        res.send(data);
    }
    catch(ex){
        res.status(400).send(ex.message)
    }
})

module.exports = router