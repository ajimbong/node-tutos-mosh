const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre} = require('../models/genres')
const {validateGenre} = require('../helpers/validate')

router.get('/', async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.post('/',auth, async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre( {
    name: req.body.name
  });
  
  try{
    const data = await genre.save();
    res.send(data);
  }
  catch(ex){
      return res.status(400).send(ex.message);
  }
});

router.put('/:id',auth, async (req, res) => {
  const genre = await Genre.findById({_id: req.params.id});
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  try{
    genre.name = req.body.name;
    const data = await genre.save();
    res.send(data);
  } 
  catch(ex){
    res.status(400).send(ex.message)
  }
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findById({_id: req.params.id});
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  try{
    const data = await Genre.deleteOne({_id: req.params.id})
    res.send(data);
  }
  catch(ex){
    res.status(400).send(ex.message)
  }
});

router.get('/:id',auth, admin, async (req, res) => {
  const genre = await Genre.findById({_id: req.params.id});
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

module.exports = router;