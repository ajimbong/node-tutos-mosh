const mongoose = require('mongoose')

mongoose.set('strictQuery',  true);
mongoose.connect('mongodb://ajim-dev.local:27017/mongo-exercises')
 .then(()=> console.log("connected successfully"))
 .catch(err => console.error(`ERorR::: -------------------
${err}`))

const courseSchema = mongoose.Schema({
    tags: {
        type: Array,
        validate: {
            validator: function(v){
                return v && v.length > 0
            },
            message: 'A course should have at least one tag'
        }
    },
    date: Date,
    name: {
        type: String,
        required: true,
	// unique: true		#This is useful for emails
        minlength: 2,
        maxlength: 25,
        // match: /pattern/
        lowercase: true,
        uppercase: false,
        trim: true
        
    },
    category: {
        type : String,
        enum: ['web', 'mobile', 'design', 'cloud']
    },
    author: String,
    isPublished: Boolean,
    price: {
        required: true,
        type: Number,
        min: 10,
        max: 100
    },
})

const Course = mongoose.model('Course', courseSchema) 
const course = new Course({
    tags: [],
    category: 'digital marketing',
    price: 0
})

course.save()
.then(res => console.log('the course was succesfully saved \n' + res))
.catch(err => {
    for (field in err.errors)
        console.log(err.errors[field].message)
})

// Course.find()
// .then(res => console.log(res))
