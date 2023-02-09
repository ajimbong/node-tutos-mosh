const mongoose = require('mongoose')

mongoose.set('strictQuery',  true);
mongoose.connect('mongodb://ajim-dev.local:27017/mongo-exercises')
 .then(()=> console.log("connected successfully"))
 .catch(err => console.error(`ERorR::: -------------------
${err}`))

/*
-*
-*
Creating an object the references another object with Mongoose
*/

const authorSchema = mongoose.Schema({
    name: String
})
const Author = mongoose.model('Author', authorSchema)

const author = new Author({name: 'Ajimsimbom Bong'})
// author.save()
// .then(res => console.log(res))
// .catch(err => console.log(err.message))

const courseSchema = mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
})
const Course = mongoose.model('Course', courseSchema)
const course = new Course({
    name : 'Node JS Zero to Hero',
    author: '63de25e49087fd51a56f54cc'
})
// course.save()
// .then(res => console.log(res))
// .catch(err => console.log(err.message))

/*
-*
-*
How oto Query the Course and author in Mongoose
*/

Course.find()
.populate('author', '-__v -_id')
.select('-__v')
.then(res => console.log(res))
.catch(err => console.log(err.message))
