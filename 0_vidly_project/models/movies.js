const  mongoose = require("mongoose");
const {Genre, genreSchema} = require('./genres')


const movieSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: genreSchema,
        required: true
    }, 
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        default: 0
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = {Movie, Genre}