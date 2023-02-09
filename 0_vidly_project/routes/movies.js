const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Movie, Genre } = require('../models/movies');
const {validateMovie} = require('../helpers/validate');

router.get('/', async(req, res) => {
    const movies = await Movie.find();
    res.send(movies)
})

router.get('/:id', async(req, res)=>{
    const movie = await Movie.findById({_id: req.params.id});
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie)
})

router.post('/',auth, async (req, res) =>{
    const {error} = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invalid genre.')

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    try{
        const data = await movie.save()
        res.send(data)
    }
    catch(ex){
        return res.status(400).send(ex.message);
    }
})

router.put('/:id',auth, async (req, res)=> {
    const {error} = validateMovie(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invalid genre.')

    try{
        const data = await Movie.findByIdAndUpdate(
            {_id: req.params.id},
            {
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            })
        res.send(data)
    }
    catch(ex){
        res.status(400).send(ex.message)
    }

})

router.delete('/:id', auth, admin, async(req, res)=>{
    try{
        const data = await Movie.findByIdAndDelete({_id: req.params.id})
        res.send(data);
    }
    catch(ex){
        res.status(400).send(ex.message)
    }
})

module.exports = router;