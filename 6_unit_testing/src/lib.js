const db = require('./db')
const mail = require('./mail')

module.exports.fizzBuzz = function(num){
    if(num % 3 === 0 && num % 5 === 0){
        return 'FizzBuzz';
    }
    else if(num % 3 === 0){
        return 'Fizz';
    }
    else if(num % 5 === 0){
        return 'Buzz';
    }
    else{
        return num;
    }
}
module.exports.throw = function(num){
   if(num){
    throw new Error('Bad request')
   }
}

module.exports.notifyUser = function(id){
 const user = db.getUser(id)

 mail.sendMail(user.name)
}