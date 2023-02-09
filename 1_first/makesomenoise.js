EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('logmee', function(data){
console. log(`Hello, your name is ${data.name} and you are ${data.age} years old.`)
})
// Raise an event
emitter.emit('logmee', {name: 'Ajim', age: 20})