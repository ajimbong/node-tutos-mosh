const Joi = require('joi')

function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required(),
      phone: Joi.string().min(7).required(),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
}

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

function validateMovie(movie){
  const schema = {
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  };

  return Joi.validate(movie, schema)
}

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

function validateUser(user) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean()
  };

  return Joi.validate(user, schema);
}

function validateLoginUser(user) {
  const schema = {
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

module.exports = {validateCustomer, validateGenre, validateMovie, validateRental, validateUser, validateLoginUser}