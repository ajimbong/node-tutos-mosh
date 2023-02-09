const mongoose = require('mongoose')

mongoose.set('strictQuery',  true);
mongoose.connect('mongodb://ajim-dev.local:27017/playground')
 .then(()=> console.log("connected successfully"))
 .catch(err => console.error(`ERorR::: -------------------
${err}`))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default : Date.now}
})

const Course = mongoose.model('Course', courseSchema);

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

(async function(){
    const result = await Course.find();
    console.log(result)
})();

