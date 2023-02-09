const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = {Customer}