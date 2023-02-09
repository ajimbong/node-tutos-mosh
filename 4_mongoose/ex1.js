const mongoose = require('mongoose')

mongoose.set('strictQuery',  true);
mongoose.connect('mongodb://ajim-dev.local:27017/mongo-exercises')
 .then(()=> console.log("connected successfully"))
 .catch(err => console.error(`ERorR::: -------------------
${err}`))

const jsData = `[
    {"tags":["express","backend"],"date":"2018-01-24T21:42:27.388Z","name":"Express.js Course","author":"Mosh","isPublished":true,"price":10,"__v":0},
    {"tags":["node","backend"],"date":"2018-01-24T21:42:47.912Z","name":"Node.js Course","author":"Mosh","isPublished":true,"price":20,"__v":0},
    {"tags":["aspnet","backend"],"date":"2018-01-24T21:42:59.605Z","name":"ASP.NET MVC Course","author":"Mosh","isPublished":true,"price":15,"__v":0},
    {"tags":["react","frontend"],"date":"2018-01-24T21:43:21.589Z","name":"React Course","author":"Mosh","isPublished":false,"__v":0},
    {"tags":["node","backend"],"date":"2018-01-24T21:44:01.075Z","name":"Node.js Course by Jack","author":"Jack","isPublished":true,"price":12,"__v":0},
    {"tags":["node","backend"],"date":"2018-01-24T21:47:53.128Z","name":"Node.js Course by Mary","author":"Mary","isPublished":false,"price":12,"__v":0},
    {"tags":["angular","frontend"],"date":"2018-01-24T21:56:15.353Z","name":"Angular Course","author":"Mosh","isPublished":true,"price":15,"__v":0}
  ]`
  const data = JSON.parse(jsData)
  //console.log(data)

// const courseSchema = new mongoose.Schema({
//     name: String,
//     author: String,
//     tags: [String],
//     date: {type: Date, default : Date.now}
// })

//const Course = mongoose.model('Course', courseSchema);

// (async function(){
//     const course = new Course({
//         name: "Angular Course",
//         author: "Mosh Hamedani",
//         tags: ['angular', 'frontend'],
//         isPublished: true
//     })

//     const result = await course.save()
//     console.log(result)
// })();

// (async function(){
//     const result = await Course.find();
//     console.log(result)
// })();

const courseSchema = mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    __v: {type: Number, default: 0}
})

const Course = new mongoose.model("Course", courseSchema);
// (async function(){
//     data.forEach(async (element, i) => {
//         const course = new Course({
//             tags: [...element.tags],
//             date: element.data,
//             name: element.name,
//             author: element.author,
//             isPublished: element.isPublished
//         })
//         const result = await course.save()
//         if(result){
//             console.log(i)
//         }
//     });
// })();

// (async function(){
//    const res = await Course.find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
//    .sort({price: -1})
//    //.count()
//    .select({name: 1, author: 1, price: 1});
//    console.log(res)
// })();

/*---------- This is a Delete Statement --------------*/
// (async function(){
//    const res = await Course.deleteOne({_id: '63dc1c3cd9a059e624b6496e'})
//    console.log(res)
// })();